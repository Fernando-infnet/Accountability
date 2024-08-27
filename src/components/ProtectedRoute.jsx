import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ element }) => {
    const { user, isAdmin } = useAuth() || { user: null, isAdmin: false };
  
    if (!user) {
      return <Navigate to="/" />;
    }
  
    return element; 
  };
  
  export default ProtectedRoute;