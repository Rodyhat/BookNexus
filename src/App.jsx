import { Route, Routes } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import './App.css'
const App = () => {
  return (
    <Wrapper className='page-content'>
      <Routes>
        <Route path="/"element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Wrapper>
  )
}

export default App;