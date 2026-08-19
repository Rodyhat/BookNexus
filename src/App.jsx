import { Route, Routes } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import LandingPage from "./pages/LandingPage";
import './App.css'
import TrendList from "./pages/TrendList";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBooks from "./pages/AdminBooks";
import AdminSettiings from "./pages/AdminSettings";
import AdminBorrowers from "./pages/AdminBorrowers";
const App = () => {
  return (
    <Wrapper className='page-content'>
      <Routes>
        {/* public pages */}
        <Route path="/"element={<LandingPage/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path="/trendinglist" element={<TrendList/>}/>

        {/* Admin pages */}
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/books" element={<AdminBooks/>}/>
        <Route path="/admin/settings" element={<AdminSettiings/>}/>
        <Route path="/admin/borrowers" element={<AdminBorrowers/>}/>
      </Routes>
    </Wrapper>
  )
}

export default App;