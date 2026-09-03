import { useCallback, useEffect, useReducer, useState } from "react";
import { AdminContext, AuthContext, BookContext, UserContext } from "../context/myContext";
import axios from "axios";
import MockUsers from "../data/mockUsers";


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
    const [isLoading, setIsLoading] = useState(true);

    // --- Admin Sidebar State ---
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Initial Auth Check
    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        };
        checkAuth();
    }, []);

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
            if (!workId) {
                throw new Error("Book ID is missing");
            }

            // Fetch the book details
            const response = await axios.get(
                `https://openlibrary.org/works/${workId}.json`,
                {
                    timeout: 10000,
                }
            );

            const book = response.data;

            // Fetch authors without allowing one failed author
            // request to break the entire book request
            const authors = await Promise.all(
                (book.authors || []).map(async (author) => {
                    try {
                        const authorKey = author?.author?.key;

                        if (!authorKey) {
                            return null;
                        }

                        const res = await axios.get(
                            `https://openlibrary.org${authorKey}.json`,
                            {
                                timeout: 5000,
                            }
                        );

                        return res.data?.name || null;
                    } catch (error) {
                        console.error("Error fetching author:", error);
                        return null;
                    }
                })
            );

            return {
                ...book,
                author_name: authors.filter(Boolean),
            };
        } catch (error) {
            console.error("Error fetching book details:", error);
            throw error;
        }
    }, []);

    // --- Centralized Book Management Logic ---
    const addBook = async (newBook) => {
        // In a real app, this would be a supabase.from('books').insert() call
        return new Promise((resolve) => {
            setTimeout(() => {
                const bookWithKey = {
                    ...newBook,
                    key: `local_${Date.now()}`,
                    status: 'Available'
                };
                setBooks(prev => [bookWithKey, ...prev]);
                resolve({ success: true });
            }, 1000);
        });
    };

    const updateBook = async (updatedBook) => {
        // In a real app, this would be a supabase.from('books').update() call
        return new Promise((resolve) => {
            setTimeout(() => {
                setBooks(prev => prev.map(book =>
                    book.key === updatedBook.key ? { ...book, ...updatedBook } : book
                ));
                resolve({ success: true });
            }, 1000);
        });
    };

    const deleteBook = async (bookKey) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setBooks(prev => prev.filter(book => book.key !== bookKey));
                resolve({ success: true });
            }, 500);
        });
    };

    // --- UI Handlers ---
    const handleSidebar = () => setSidebarOpen(!sidebarOpen);

    // --- Mock Auth Handlers ---
    const login = (email, password) => {
        const foundUser = MockUsers.find(u => u.email === email && u.password === password);
        if (foundUser) {
            setIsAuthenticated(true);
            setUser({ email: foundUser.email, name: email.split('@')[0] });
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

    // use reducer to handle the add book in the admin page

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, role, isLoading, login, logout }}>
            <BookContext.Provider value={{
                search,
                books,
                changeSearch,
                loadMore,
                fetchBookDetails,
                addBook,
                updateBook,
                deleteBook
            }}>
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