ALTER TABLE public.borrow_requests
    ADD COLUMN IF NOT EXISTS return_date date,
    ADD COLUMN IF NOT EXISTS returned_at timestamptz;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'borrow_requests_loan_period_days_check'
          AND conrelid = 'public.borrow_requests'::regclass
    ) THEN
        ALTER TABLE public.borrow_requests
            ADD CONSTRAINT borrow_requests_loan_period_days_check
            CHECK (loan_period_days IN (7, 14, 21));
    END IF;
END;
$$;

ALTER TABLE public.borrow_requests ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
    policy_record record;
BEGIN
    FOR policy_record IN
        SELECT policyname
        FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'borrow_requests'
    LOOP
        EXECUTE format('DROP POLICY %I ON public.borrow_requests', policy_record.policyname);
    END LOOP;
END;
$$;

REVOKE UPDATE, DELETE ON public.borrow_requests FROM anon, authenticated;
GRANT SELECT, INSERT ON public.borrow_requests TO authenticated;

CREATE POLICY borrow_requests_read_own_or_admin
    ON public.borrow_requests
    FOR SELECT
    TO authenticated
    USING (
        user_id = (SELECT auth.uid())
        OR EXISTS (
            SELECT 1
            FROM public.profiles
            WHERE profiles.id = (SELECT auth.uid())
              AND profiles.role = 'admin'
        )
    );

CREATE POLICY borrow_requests_create_pending_own
    ON public.borrow_requests
    FOR INSERT
    TO authenticated
    WITH CHECK (
        user_id = (SELECT auth.uid())
        AND status = 'pending'
        AND decided_at IS NULL
        AND return_date IS NULL
        AND loan_period_days IN (7, 14, 21)
        AND EXISTS (
            SELECT 1
            FROM public.books
            WHERE books.id = borrow_requests.book_id
              AND books.available_copies > 0
        )
    );

CREATE OR REPLACE FUNCTION public.review_borrow_request(
    p_request_id text,
    p_decision text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    request_row public.borrow_requests%ROWTYPE;
    remaining_copies integer;
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE profiles.id = auth.uid()
          AND profiles.role = 'admin'
    ) THEN
        RAISE EXCEPTION 'Only admins can review borrow requests.';
    END IF;

    IF p_decision IS NULL OR p_decision NOT IN ('approved', 'rejected', 'returned') THEN
        RAISE EXCEPTION 'Decision must be approved, rejected, or returned.';
    END IF;

    SELECT *
    INTO request_row
    FROM public.borrow_requests
    WHERE id::text = p_request_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Borrow request was not found.';
    END IF;

    IF p_decision = 'returned' THEN
        IF request_row.status <> 'approved' THEN
            RAISE EXCEPTION 'Only approved loans can be marked returned.';
        END IF;

        UPDATE public.books
        SET available_copies = LEAST(total_copies, available_copies + 1)
        WHERE id = request_row.book_id;

        UPDATE public.borrow_requests
        SET status = 'returned',
            decided_at = COALESCE(decided_at, now()),
            returned_at = now()
        WHERE id = request_row.id;
    ELSIF request_row.status <> 'pending' THEN
        RAISE EXCEPTION 'Only pending requests can be reviewed.';
    ELSIF p_decision = 'rejected' THEN
        UPDATE public.borrow_requests
        SET status = 'rejected',
            decided_at = now()
        WHERE id = request_row.id;
    ELSE
        SELECT available_copies
        INTO remaining_copies
        FROM public.books
        WHERE id = request_row.book_id
        FOR UPDATE;

        IF remaining_copies IS NULL OR remaining_copies < 1 THEN
            RAISE EXCEPTION 'This book is no longer available.';
        END IF;

        UPDATE public.books
        SET available_copies = available_copies - 1
        WHERE id = request_row.book_id;

        UPDATE public.borrow_requests
        SET status = 'approved',
            decided_at = now(),
            return_date = (current_date + request_row.loan_period_days)
        WHERE id = request_row.id;
    END IF;

    RETURN jsonb_build_object(
        'id', request_row.id,
        'status', p_decision
    );
END;
$$;

REVOKE ALL ON FUNCTION public.review_borrow_request(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.review_borrow_request(text, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.can_download_book_file(object_name text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
    SELECT
        auth.uid() IS NOT NULL
        AND (
            EXISTS (
                SELECT 1
                FROM public.borrow_requests AS request
                JOIN public.books AS book ON book.id = request.book_id
                WHERE request.user_id = auth.uid()
                  AND request.status = 'approved'
                  AND book.ebook_path = object_name
            )
            OR EXISTS (
                SELECT 1
                FROM public.profiles
                WHERE profiles.id = auth.uid()
                  AND profiles.role = 'admin'
            )
        );
$$;

REVOKE ALL ON FUNCTION public.can_download_book_file(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_download_book_file(text) TO anon, authenticated;

UPDATE storage.buckets
SET public = false
WHERE id = 'book-files';

DROP POLICY IF EXISTS book_files_approved_download ON storage.objects;
DROP POLICY IF EXISTS book_files_download_requires_approval ON storage.objects;
DROP POLICY IF EXISTS "TEST authenticated upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload book covers" ON storage.objects;

CREATE POLICY book_files_approved_download
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (
        bucket_id = 'book-files'
        AND public.can_download_book_file(name)
    );

CREATE POLICY book_files_download_requires_approval
    ON storage.objects
    AS RESTRICTIVE
    FOR SELECT
    TO public
    USING (
        bucket_id <> 'book-files'
        OR (
            auth.uid() IS NOT NULL
            AND public.can_download_book_file(name)
        )
    );
