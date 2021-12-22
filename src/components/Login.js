import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export const TrialLoginForm = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { logIn } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await logIn(emailRef.current.value, passwordRef.current.value)
            history.push("/dashboard")
        } catch {
            setError("Failed to log in")
        }
        setLoading(false)
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-12 col-xs-12">
                    <form className="form-container" onSubmit={handleSubmit}>
                        <h3>Log in to KPI Portal</h3>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control" />
                        </div>
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn submit-buttons">Log In</button>
                        </div>
                        <div className="w-100 text-center mt-2" style={{ color: "rgb(95, 92, 136)", fontWeight: "600" }}>
                            Need an account? <Link to="/signup">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 