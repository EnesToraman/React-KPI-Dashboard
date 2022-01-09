import React, { useContext, useState } from "react"
import { Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../App"
import { api } from "../api"

export const Login = () => {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await api.login({ email, password })
            const { data: { role } } = await api.getUser()
            setUser({ email, role })
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
            setError("Failed to log in")
            setLoading(false)
        }
    }

    return (
        <div className="root-div">
            <Container className="d-flex align-items-center justify-content-center">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <form className="form-container" onSubmit={handleSubmit}>
                                <h3>Log in to KPI Dashboard</h3>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <div className="form-group" id="email">
                                    <label>Email</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group" id="password">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="d-grid gap-2">
                                    <button disabled={loading} type="submit" className="btn submit-buttons">Log in</button>
                                </div>
                                <div className="w-100 text-center mt-2" style={{ color: "rgb(95, 92, 136)", fontWeight: "600" }}>
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