//import React from 'react'
import { useAuth } from "../src/context/authContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // ❗ added return
    }

    if (!user || !requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />; // ❗ added return
    }

    return children;
};

export default RoleBaseRoutes;