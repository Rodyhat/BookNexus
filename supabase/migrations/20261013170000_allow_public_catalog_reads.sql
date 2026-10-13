GRANT SELECT ON TABLE public.books TO anon, authenticated;

DROP POLICY IF EXISTS books_catalog_read ON public.books;

CREATE POLICY books_catalog_read
    ON public.books
    FOR SELECT
    TO anon, authenticated
    USING (true);
