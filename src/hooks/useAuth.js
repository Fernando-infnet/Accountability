import { useState, useEffect } from "react";
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const emailParts = user.email?.split('@');
                if (emailParts && emailParts[1].includes('admin')) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }

                const blockedUsersQuery = query(
                    collection(db, "blockedUsers"),
                    where("userUID", "==", user.uid)
                );
                const querySnapshot = await getDocs(blockedUsersQuery);

                if (!querySnapshot.empty) {
                    console.log("User is blocked.");
                    setIsBlocked(true);
                    setUser(false);
                    setIsAdmin(false);
                } else {
                    console.log("User is not blocked.");
                    setIsBlocked(false);
                }
            } else {
                setUser(null);
                setIsAdmin(false);
                setIsBlocked(false);
            }
        });

        return () => unsubscribe();
    }, [auth, db]);

    return { user, isAdmin, isBlocked };
};

export default useAuth;
