import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { registration, login } from '../store/actions/auth';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/LoginForm.module.css';
import CustomAlert from './CustomAlert';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const alertMessage = useSelector((state) => state.auth.message);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(name, password));
        navigate('/');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registration(email, password, name, full_name));
    };

    const handleToggleForm = () => {
        setIsLoginForm(!isLoginForm);
    };

    return (
        <Container
            fluid
            className={`d-flex justify-content-center align-items-center ${styles.container}`}
        >
            <Form
                onSubmit={isLoginForm ? handleLogin : handleRegister}
                className={`bg-dark p-4 rounded-lg shadow-lg text-light ${styles.form}`}
            >
                <h2 className="mb-4 text-center">
                    {isLoginForm ? 'Login' : 'Register'}
                </h2>

                {/* Login field */}
                <Form.Group controlId="formBasicLogin">
                    <Form.Label>Login</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter login"
                        value={name}
                        onChange={(e) => setLogin(e.target.value)}
                        className="bg-dark text-light mb-3"
                    />
                </Form.Group>

                {/* Email field */}
                {!isLoginForm && (
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-dark text-light mb-3"
                        />
                    </Form.Group>
                )}

                {!isLoginForm && (
                    <Form.Group controlId="formBasicFullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="full_name"
                            placeholder="Enter your full name"
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                            className="bg-dark text-light mb-3"
                        />
                    </Form.Group>
                )}

                {/* Password field */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-dark text-light mb-3"
                    />
                </Form.Group>

                {/* Additional field for password confirmation in registration form */}
                {!isLoginForm && (
                    <Form.Group controlId="formBasicPasswordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            className="bg-dark text-light mb-3"
                        />
                    </Form.Group>
                )}

                {/* Submit button */}
                <Button
                    variant="info"
                    type="submit"
                    className={`${styles.submitButton}`}
                    onClick={() => { setShowAlert(true); }}
                >
                    {isLoginForm ? 'Login' : 'Register'}
                </Button>

                <Button variant="link" className={`${styles.customButton}`}>
                    Forgot your password?
                </Button>

                {/* Toggle form button */}
                <Button
                    variant="link"
                    onClick={handleToggleForm}
                    className={`${styles.customButton}`}
                >
                    {isLoginForm ? 'Is not Registered?' : 'Back to Login'}
                </Button>
            </Form>
            <CustomAlert show={showAlert} handleClose={() => { setShowAlert(false); }} message={alertMessage} />
        </Container>
    );
};

export default LoginForm;
