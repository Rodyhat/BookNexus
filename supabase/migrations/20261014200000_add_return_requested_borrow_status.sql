ALTER TABLE public.borrow_requests
    DROP CONSTRAINT IF EXISTS borrow_requests_status_check;

ALTER TABLE public.borrow_requests
    ADD CONSTRAINT borrow_requests_status_check
    CHECK (status IN ('pending', 'approved', 'rejected', 'returned', 'return_requested'));
