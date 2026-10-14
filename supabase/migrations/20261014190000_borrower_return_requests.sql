ALTER TABLE public.borrow_requests
    ADD COLUMN IF NOT EXISTS return_requested_at timestamptz;

CREATE OR REPLACE FUNCTION public.request_borrow_return(
    p_request_id text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    request_row public.borrow_requests%ROWTYPE;
BEGIN
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'You must be signed in to request a return.';
    END IF;

    SELECT *
    INTO request_row
    FROM public.borrow_requests
    WHERE id::text = p_request_id
    FOR UPDATE;

    IF NOT FOUND OR request_row.user_id <> auth.uid() THEN
        RAISE EXCEPTION 'Borrow request was not found.';
    END IF;

    IF request_row.status <> 'approved' THEN
        RAISE EXCEPTION 'Only approved loans can be returned.';
    END IF;

    UPDATE public.borrow_requests
    SET status = 'return_requested',
        return_requested_at = now()
    WHERE id = request_row.id;

    RETURN jsonb_build_object(
        'id', request_row.id,
        'status', 'return_requested'
    );
END;
$$;

REVOKE ALL ON FUNCTION public.request_borrow_return(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.request_borrow_return(text) TO authenticated;

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
        IF request_row.status NOT IN ('approved', 'return_requested') THEN
            RAISE EXCEPTION 'Only active loans or requested returns can be marked returned.';
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

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime'
    ) AND NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
          AND schemaname = 'public'
          AND tablename = 'borrow_requests'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.borrow_requests;
    END IF;
END;
$$;