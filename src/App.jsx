import { Route, Routes } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import TrendList from "./pages/TrendList";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBooks from "./pages/AdminBooks";
import AdminSettiings from "./pages/AdminSettings";
import AdminBorrowers from "./pages/AdminBorrowers";
import AdminLayout from "./components/AdminLayout";
import BookDetails from "./pages/BookDetails";
import UserDashboard from "./pages/UserDashboard";
import UserLayout from "./components/UserLayout";
import UserBooks from "./pages/UserBooks";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddEditBook from "./pages/AddEditBooks";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import BorrowConfirm from "./pages/BorrowConfirm";
import BorrowingSuccess from "./pages/BorrowSuccess";
import SignUp from "./pages/SignUp";
import ConfirmEmail from "./pages/ConfirmEmail";

const App = () => {
  return (
    <Wrapper className="page-content">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <Routes>
        {/* PUBLIC PAGES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/trendinglist" element={<TrendList />} />

        {/* Guests can view book details */}
        <Route path="/bookdetails/:bookId" element={<BookDetails />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />

        {/* PROTECTED: any logged-in user (borrowing flow) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/borrow-confirm/:bookId" element={<BorrowConfirm />} />
          <Route path="/borrow-success" element={<BorrowingSuccess />} />
        </Route>

        {/* PROTECTED: admin only */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="books" element={<AdminBooks />} />
            <Route path="settings" element={<AdminSettiings />} />
            <Route path="borrowers" element={<AdminBorrowers />} />
            <Route path="add_edit_books" element={<AddEditBook />} />
          </Route>
        </Route>

        {/* PROTECTED: regular users only */}
        <Route element={<ProtectedRoute requiredRole="user" />}>
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="mybooks" element={<UserBooks />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Wrapper>
  );
};

export default App;
