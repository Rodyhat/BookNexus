import { Route, Routes } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import './App.css'
import TrendList from "./pages/TrendList";
const App = () => {
  return (
    <Wrapper className='page-content'>
      <Routes>
        <Route path="/"element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/trendinglist" element={<TrendList/>}/>
      </Routes>
    </Wrapper>
  )
}

export default App;