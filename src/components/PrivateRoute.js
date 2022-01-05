import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../App";

export const PrivateRoute = (props) => {
    const { user, isLoading } = useContext(UserContext);
    const { component: Component, ...rest } = props;

    if (isLoading) {
        return <div>Loading</div>
    }
    if (user) {
        return (<Component {...rest} />)
    }
    return user ? <Component {...rest} /> : <Navigate to='/sign-in' />

}