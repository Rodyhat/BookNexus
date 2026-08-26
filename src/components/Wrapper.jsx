import { useCallback, useEffect, useState } from "react";
import { AdminContext, AuthContext, BookContext } from "../context/myContext"
import axios from "axios";

const Wrapper = ({ children }) => {
    let [search, setSearch] = useState('')
    let [page, setPage] = useState(1)
    let [books, setBooks] = useState([]);

    // Admin sidebar state
    let [sidebarOpen, setSidebarOpen] = useState(false)

    const trendingQuery = "popular books";

    let fetchBooks = async (query, pageNumber = 1) => {
        try {
            let { data } = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${pageNumber}&limit=4`);

            if (pageNumber === 1) {
                setBooks(data.docs);
            } else {
                setBooks((prevBooks) => {
                    const existingBooks = new Set(
                        prevBooks.map(book => book.key)
                    );
                    const newBooks = data.docs.filter(
                        (book) => !existingBooks.has(book.key)
                    );
                    return [...prevBooks, ...newBooks]
                })
            }
        }
        catch (error) {
            console.log('Error fetching books', error);

        }
    }

    useEffect(
        () => {
            const timer = setTimeout(() => {
                setPage(1)
                const query = search.trim()
                    ? search : trendingQuery
                fetchBooks(query, 1)
            }, 500);
            return (() => clearTimeout(timer)
            )
        }, [search]
    )

    // existing book function
    const changeSearch = (value) => {
        setSearch(value);
    }

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        const query = search.trim() ? search : trendingQuery
        fetchBooks(query, nextPage)

    }

    // function that handles setSidebarOpen
    const handleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    // fetch one specific book
 const fetchBookDetails = useCallback(async (workId) => {
    try {
        // Get the book/work details
        const response = await axios.get(
            `https://openlibrary.org/works/${workId}.json`
        );

        const book = response.data;

        // Get the author names
        const authors = await Promise.all(
            (book.authors || []).map(async (author) => {
                const authorKey = author.author.key;

                const authorResponse = await axios.get(
                    `https://openlibrary.org${authorKey}.json`
                );

                return authorResponse.data.name;
            })
        );

        return {
            ...book,
            author_name: authors,
        };
    } catch (error) {
        console.error("Error fetching book details:", error);
        throw error;
    }
}, []);
    return (
        <AuthContext.Provider value={{}} >
            <AdminContext.Provider value={{ sidebarOpen, handleSidebar }}>
                <BookContext.Provider value={{ search, books, changeSearch, loadMore, fetchBookDetails }}>
                    {children}
                </BookContext.Provider>
            </AdminContext.Provider>
        </AuthContext.Provider>
    )
}



export default Wrapper;