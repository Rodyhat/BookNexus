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
import AdminLayout from "./components/AdminLayout";
const App = () => {
  return (
    <Wrapper className='page-content'>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path="/trendinglist" element={<TrendList />} />

        {/* Admin pages */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="settings" element={<AdminSettiings />} />
          <Route path="borrowers" element={<AdminBorrowers />} />
        </Route>

      </Routes>
    </Wrapper>
  )
}

export default App;