import { useEffect, useState } from "react";
import { AuthContext, BookContext } from "../context/myContext"
import axios from "axios";

const Wrapper = ({ children }) => {
    let [search, setSearch] = useState('javascript')
    let [books, setBooks] = useState([]);


        let fetchBooks = async () => {
            try {
                let { data } = await axios.get(`https://openlibrary.org/search.json?q=${search}`);

                setBooks(data.docs);
            }
            catch (error) {
                console.log('Error fetching books', error);

            }
        }

        useEffect(
            () => {
                fetchBooks();
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