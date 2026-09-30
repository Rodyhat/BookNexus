import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/myContext";

const ProtectedRoute = ({ requiredRole }) => {
    const {
        isAuthenticated,
        role,
        isLoading,
    } = useContext(AuthContext);

    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/signin"
                state={{
                    from: location.pathname + location.search,
                }}
                replace
            />
        );
    }

    if (requiredRole && role !== requiredRole) {
        const fallback =
            role === "admin"
                ? "/admin/dashboard"
                : "/user/dashboard";

        return (
            <Navigate
                to={fallback}
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;