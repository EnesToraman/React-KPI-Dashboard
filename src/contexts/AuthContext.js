import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const baseURL = 'http://127.0.0.1:8000'
const httpClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    withCredentials: true,
})

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [email, setEmail] = useState("");

    const login = async (email, password) => {
        try {
            const payload = { email, password }
            return httpClient.post('http://localhost:8080/login', payload)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                return httpClient.get('http://localhost:8080/getUser')
                .then((response) => {
                    const email = response.data.email
                    setEmail(email)
                    setAuthenticated(true)
                    console.log(authenticated)
                    console.log(email)
                })
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    const value = {
        login,
        email,
        setEmail,
        authenticated,
        setAuthenticated
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}