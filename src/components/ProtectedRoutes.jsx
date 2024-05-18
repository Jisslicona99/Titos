 
import React from 'react';
import {Navigate } from 'react-router-dom'; 
import Cookies from 'js-cookie'; 

const ProtectedRoutes = ({ children }) => {
    const isAuthenticated = Cookies.get('access_token');

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    } 
    return children;
};

export default ProtectedRoutes; 