import { useContext, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { BookContext } from "../context/myContext";
import { Link } from "react-router-dom";
const Trending = () => {

    let { books} = useContext(BookContext);
    return (
        <section>
            <div className="">
                <h2>Trending Now</h2>
                <Link>View All <FaArrowRight /></Link>
            </div>
            <div className="">
                {books.map((book, i) => {
                    <div key={book.key}>
                        <h1>{book.title}</h1>
                        <p>{book.author}</p>
                    </div>
                })}
            </div>
        </section>
    )
}
export default Trending;