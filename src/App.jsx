import { Route, Routes } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Login from "./pages/Login";

const App = () => {
  return (
    <Wrapper>
      <Routes>
        <Route path='' element={<Login/>}/>
      </Routes>
    </Wrapper>
  )
}

export default App;