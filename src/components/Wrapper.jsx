import { useEffect, useState } from "react";
import { AuthContext, BookContext } from "../context/myContext"
import axios from "axios";

const Wrapper = ({ children }) => {
    let [search, setSearch] = useState('bestsellers')
    let [books, setBooks] = useState([]);


    let fetchBooks = async () => {
        try {
            let { data } = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(search)}&limit=4`);
            setBooks(data.docs);
        }
        catch (error) {
            console.log('Error fetching books', error);

        }
    }

    useEffect(
        () => {
            const timer = setTimeout(() => {
                fetchBooks(search)
            }, 3000);
            return (() => clearTimeout(timer)
            )
        }, [search]
    )
    const changeSearch = (value) => {
        setSearch(value);
    }


    return (
        <AuthContext.Provider value={{}} >
            <BookContext.Provider value={{ search, books, changeSearch }}>
                {children}
            </BookContext.Provider>
        </AuthContext.Provider>
    )
}



export default Wrapper;