import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoute = ({ children, redirectTo }) => {
    const { authenticated } = useAuth()
    
    return authenticated ? children : <Navigate to={redirectTo} />

}