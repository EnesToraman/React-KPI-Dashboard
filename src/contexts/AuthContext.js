import React, { useState, useEffect, useContext } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);

    const signUp = (email, password) => {
        return // createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        return // signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return // signOut(auth);
    }

    const resetPassword = (email) => {
        return // sendPasswordResetEmail(auth, email);
    }

    // useEffect(() => {
    //     const unsub = onAuthStateChanged(auth, (user) => {
    //         setCurrentUser(user)
    //         setLoading(false)
    //     })

    //     return unsub
    // }, [])

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}