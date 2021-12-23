import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"

export const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    // const { logIn } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    // const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            // await logIn(emailRef.current.value, passwordRef.current.value)
            // navigate("/dashboard")
        } catch {
            setError("Failed to log in")
        }
        setLoading(false)
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
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn submit-buttons">Log in</button>
                                </div>
                                <div className="w-100 text-center mt-2" style={{ color: "rgb(95, 92, 136)", fontWeight: "600" }}>
                                    Don't have an account? <Link to="/signup">Sign up</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
} 