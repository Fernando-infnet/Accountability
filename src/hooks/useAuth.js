import { useState, useEffect } from "react";
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          const emailParts = user.email?.split('@');
          if (emailParts && emailParts[1].includes('admin')) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      });
  
      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe(); // Ensure unsubscribe is a function
        }
      };
    }, []);
  
    return { user, isAdmin };
  };
  
  export default useAuth;