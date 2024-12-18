import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true'; 
    if (!isAuthenticated) {
      return <Navigate to="/signin" replace />; 
    }
    return children; 
  };

export default PrivateRoute;