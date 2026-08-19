import { useEffect, useState } from "react";
import { AuthContext, BookContext } from "../context/myContext"
import axios from "axios";

const Wrapper = ({ children }) => {
    let [search, setSearch] = useState('')
    let [page, setPage] = useState(1)
    let [books, setBooks] = useState([]);
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
    const changeSearch = (value) => {
        setSearch(value);
    }

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        const query = search.trim() ? search : trendingQuery
        fetchBooks(query, nextPage)

    }
    const handleSidebar = () => {

    }
    return (
        <AuthContext.Provider value={{}} >
            <BookContext.Provider value={{ search, books, changeSearch, loadMore }}>
                {children}
            </BookContext.Provider>
        </AuthContext.Provider>
    )
}



export default Wrapper;