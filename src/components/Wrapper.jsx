import { useCallback, useEffect, useReducer, useState } from "react";
import { AdminContext, AuthContext, BookContext, UserContext } from "../context/myContext";
import axios from "axios";
import { supabase } from "../services/supabase";

const Wrapper = ({ children }) => {
    // --- Book Catalog State ---
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [books, setBooks] = useState([]);
    const [libraryBooks, setLibraryBooks] = useState([]);
    const trendingQuery = "popular books";

    const fetchLibraryBooks = async () => {
        try {
            const { data, error } = await supabase
                .from('books')
                .select('*')
                .order('id', { ascending: false })
            if (error) {
                throw error
            }
            setLibraryBooks(data)
        }
        catch (error) {
            console.error('Error fetching Library', error);

        }
    }

    useEffect(() => {
        fetchLibraryBooks()
    }, [])

    // --- Auth & User State ---
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // --- Supabase Authentication ---
    useEffect(() => {
        const getInitialSession = async () => {
            setIsLoading(true);

            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Error getting session:", error);
            }

            if (data?.session?.user) {
                const currentUser = data.session.user;

                setUser(currentUser);
                setIsAuthenticated(true);
                setRole(currentUser.user_metadata?.role || "user");
            }

            setIsLoading(false);
        };

        getInitialSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(session.user);
                setIsAuthenticated(true);
                setRole(session.user.user_metadata?.role || "user");
            } else {
                setUser(null);
                setIsAuthenticated(false);
                setRole(null);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // --- Login ---
    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return {
                success: false,
                message: error.message,
            };
        }

        const loggedInUser = data.user;

        setUser(loggedInUser);
        setIsAuthenticated(true);
        setRole(loggedInUser.user_metadata?.role || "user");

        return {
            success: true,
            role: loggedInUser.user_metadata?.role || "user",
        };
    };

    // --- Logout ---
    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error);
            return;
        }

        setUser(null);
        setIsAuthenticated(false);
        setRole(null);
    };

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
        try {
            const { data, error } = await supabase
                .from("books")
                .insert([
                    {
                        title: newBook.title,
                        author: newBook.author_name,
                        isbn: newBook.isbn || null,
                        genre: newBook.genre || null,
                        publisher: newBook.publisher || null,
                        description: newBook.description || null,
                        total_copies: Number(newBook.totalCopies),
                        available_copies: Number(newBook.totalCopies),
                        cover_url: newBook.bookImage || null
                    }
                ])
                .select()
                .single();

            if (error) {
                throw error;
            }

            // update the library books immediately
            setLibraryBooks(prev => [data, ...prev])
            return {
                success: true,
                data
            }
        } catch (error) {
            console.log('Error adding book:', error);
            throw error;
        }
    }

    const updateBook = async (updatedBook) => {
        try {
            const { data, error } = await supabase
                .from("books")
                .update({
                    title: updatedBook.title,
                    author: updatedBook.author_name,
                    genre: updatedBook.genre || null,
                    description: updatedBook.description || null,
                    isbn: updatedBook.isbn || null,
                    publisher: updatedBook.publisher || null,
                    total_copies: Number(updatedBook.totalCopies),
                    available_copies: Number(updatedBook.totalCopies),
                    cover_url: updatedBook.bookImage || null,
                    ebook_path: updatedBook.ebookPath || null
                })
                .eq('id', updatedBook.id)
                .select()
                .single();

            if (error) {
                throw error;
            }

            setLibraryBooks(prev =>
                prev.map(book =>
                    book.id === data.id ? data : book
                )
            );

            return {
                success: true,
                data
            };

        } catch (error) {
            console.log('Error updating books:', error);
            throw error;
        }
    };

    const deleteBook = async (bookId) => {
        try {
            const { error } = await supabase
                .from('books')
                .delete()
                .eq('id', bookId)
            if (error) {
                throw error;
            }

            setLibraryBooks(prev => prev.filter(book => book.id !== bookId));
            return {
                success: true
            }
        } catch (error) {
            console.log('Error deleting books:', error);
            throw error
        }
    };

    // --- UI Handlers ---
    const handleSidebar = () => setSidebarOpen(!sidebarOpen);

    // usereducer to handle the add book in the admin page

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
                deleteBook,
                libraryBooks,
                fetchLibraryBooks
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