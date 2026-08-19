import { Route, Routes } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import LandingPage from "./pages/LandingPage";
import './App.css'
import TrendList from "./pages/TrendList";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/AdminDashboard";
const App = () => {
  return (
    <Wrapper className='page-content'>
      <Routes>
        <Route path="/"element={<LandingPage/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path="/trendinglist" element={<TrendList/>}/>
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
      </Routes>
    </Wrapper>
  )
}

export default App;