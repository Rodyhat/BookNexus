import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/myContext';

/**
 * ProtectedRoute Component
 * 
 * Securely wraps routes based on authentication status and user roles.
 * @param {string} requiredRole - Optional role requirement ('admin' or 'user')
 */
const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, role, isLoading } = useContext(AuthContext);

  // Show nothing or a spinner while checking auth status (if applicable)
  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  // 1. Redirect to Login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // 2. Redirect if role doesn't match
  if (requiredRole && role !== requiredRole) {
    const fallback = role === 'admin' ? '/admin/dashboard' : '/userdashboard';
    return <Navigate to={fallback} replace />;
  }

  // 3. Render child routes if all checks pass
  return <Outlet />;
};

export default ProtectedRoute;