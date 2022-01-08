import React, { useState } from 'react';
import { Alert, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { api } from '../api';

export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPass) {
            return setError("Passwords do not match")
        }
        try {
            setSuccessMsg("");
            setError("");
            setLoading(true);
            await api.signUp({ email, password })
            setLoading(false); 
            setSuccessMsg("Account is created")
        } catch {
            setError("Failed to create an account");
            setLoading(false);
        }
    }

    return (
        <div className="root-div">
            <Container className="d-flex align-items-center justify-content-center">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <form className="form-container" onSubmit={handleSubmit}>
                                <h3>Sign up to KPI Dashboard</h3>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {successMsg && <Alert variant="success">{successMsg}</Alert>}
                                <div className="form-group" id="email">
                                    <label>Email</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group" id="password">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className="form-group" id="confirm-password">
                                    <label>Confirm Password</label>
                                    <input type="password" className="form-control" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
                                </div>
                                <div className="d-grid gap-2">
                                    <button disabled={loading} type="submit" className="btn submit-buttons">Sign up</button>
                                </div>
                                <div className="w-100 text-center mt-2" style={{ color: "rgb(95, 92, 136)", fontWeight: "600" }}>
                                    Already have an account? <Link to="/login">Log in</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
} 