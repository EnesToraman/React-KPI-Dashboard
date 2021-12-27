import React, { useRef, useState } from "react"
import { Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export const Login = () => {
    const { login, setAuthenticated, setEmail } = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            setAuthenticated(true)
        } catch (error) {
            setError("Failed to log in")
        } finally {
            setLoading(false)
            navigate("/dashboard")
        }
    }

    return (
        <div className="root-div">
            <Container className="d-flex align-items-center justify-content-center">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <form className="form-container" onSubmit={handleSubmit}>
                                <h3>Log in to KPI Portal</h3>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <div className="form-group" id="email">
                                    <label>Email</label>
                                    <input type="email" className="form-control" ref={emailRef} />
                                </div>
                                <div className="form-group" id="password">
                                    <label>Password</label>
                                    <input type="password" className="form-control" ref={passwordRef} />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn submit-buttons">Log in</button>
                                </div>
                                <div disabled={loading} className="w-100 text-center mt-2" style={{ color: "rgb(95, 92, 136)", fontWeight: "600" }}>
                                    Don't have an account? <Link to="/sign-up">Sign up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}