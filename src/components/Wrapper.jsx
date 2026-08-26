import { useCallback, useEffect, useState } from "react";
import { AdminContext, AuthContext, BookContext, UserContext } from "../context/myContext";
import axios from "axios";
import MockUsers from "../data/mockUsers"; // Assuming path based on project structure

/**
 * BookNexus Context Wrapper
 * 
 * Manages global state for:
 * 1. Books (OpenLibrary API integration)
 * 2. Auth (Mock Authentication for development)
 * 3. Admin UI (Sidebar states)
 * 4. User Profile (Contextual data)
 */
const Wrapper = ({ children }) => {
    // --- Book Catalog State ---
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [books, setBooks] = useState([]);
    const trendingQuery = "popular books";

    // --- Auth & User State ---
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // --- Admin Sidebar State ---
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // --- Book Fetching Logic ---
    const fetchBooks = async (query, pageNumber = 1) => {
        try {
            const { data } = await axios.get(
                `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${pageNumber}&limit=12`
            );

            if (pageNumber === 1) {
                setBooks(data.docs);
            } else {
                setBooks((prevBooks) => {
                    const existingKeys = new Set(prevBooks.map(book => book.key));
                    const filtered = data.docs.filter(book => !existingKeys.has(book.key));
                    return [...prevBooks, ...filtered];
                });
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setPage(1);
            const query = search.trim() ? search : trendingQuery;
            fetchBooks(query, 1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const changeSearch = (value) => setSearch(value);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        const query = search.trim() ? search : trendingQuery;
        fetchBooks(query, nextPage);
    };

    const fetchBookDetails = useCallback(async (workId) => {
        try {
            const response = await axios.get(`https://openlibrary.org/works/${workId}.json`);
            const book = response.data;
            const authors = await Promise.all(
                (book.authors || []).map(async (author) => {
                    const authorKey = author.author.key;
                    const res = await axios.get(`https://openlibrary.org${authorKey}.json`);
                    return res.data.name;
                })
            );
            return { ...book, author_name: authors };
        } catch (error) {
            console.error("Error fetching details:", error);
            throw error;
        }
    }, []);

    // --- UI Handlers ---
    const handleSidebar = () => setSidebarOpen(!sidebarOpen);

    // --- Mock Auth Handlers ---
    const login = (email, password) => {
        const foundUser = MockUsers.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
            setIsAuthenticated(true);
            setUser({ email: foundUser.email, name: email.split('@')[0] }); // Derived name for mock
            setRole(foundUser.role);
            return { success: true, role: foundUser.role };
        } else {
            return { success: false, message: "Invalid credentials" };
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout }}>
            <BookContext.Provider value={{ search, books, changeSearch, loadMore, fetchBookDetails }}>
                <AdminContext.Provider value={{ sidebarOpen, handleSidebar }}>
                    <UserContext.Provider value={{ profile: user, history: [] }}>
                        {children}
                    </UserContext.Provider>
                </AdminContext.Provider>
            </BookContext.Provider>
        </AuthContext.Provider>
    );
};

export default Wrapper;