import React, { useState, useRef } from 'react';
import { Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

export const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="root-div">
            <Container className="d-flex align-items-center justify-content-center">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-sm-12 col-xs-12">
                            <form className="form-container">
                                <h3>Sign up to KPI Portal</h3>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <div className="form-group" id="email">
                                    <label>Email</label>
                                    <input type="email" className="form-control" ref={emailRef}/>
                                </div>
                                <div className="form-group" id="password">
                                    <label>Password</label>
                                    <input type="password" className="form-control" ref={passwordRef}/>
                                </div>
                                <div className="form-group" id="confirm-password">
                                    <label>Confirm Password</label>
                                    <input type="password" className="form-control" ref={passwordConfirmRef}/>
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