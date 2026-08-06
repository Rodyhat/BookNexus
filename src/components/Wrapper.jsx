import { useState } from "react";
import { AuthContext } from "../context/myContext"

const Wrapper = ({ children }) => {
    let [hi,setHi] = useState('')
    return (
        <AuthContext.Provider value={{hi}} >
            {children}
        </AuthContext.Provider>
    )
}

export default Wrapper;