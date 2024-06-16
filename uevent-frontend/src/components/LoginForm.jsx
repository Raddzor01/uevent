import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import { registration, login } from '../store/actions/auth';
import { useNavigate } from 'react-router-dom';
import CustomAlert from './CustomAlert';
import PasswordResetModal from './PasswordResetModal';

import styles from '../styles/LoginForm.module.css';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const alertMessage = useSelector((state) => state.auth.message);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (
            alertMessage !== 'Logout success' &&
            alertMessage !== 'List of events received successfully' &&
            alertMessage !== 'List of themes received successfully' &&
            alertMessage !== 'List of companies received successfully'
        ) {
            if (user) {
                navigate('/');
            } else {
                setShowAlert(true);
            }
        } else {
            return;
        }
    }, [user, alertMessage, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(login(name, password));
    };

    const handleOpenPasswordModal = () => {
        setShowPasswordModal(true);
    };

    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(
            registration(
                email,
                password,
                confirmationPassword,
                name,
                full_name,
            ),
        );
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

                {!isLoginForm && (
                    <Form.Group controlId="formBasicPasswordConfirmation">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmationPassword}
                            onChange={(e) =>
                                setConfirmationPassword(e.target.value)
                            }
                            className="bg-dark text-light mb-3"
                        />
                    </Form.Group>
                )}

                <Button
                    variant="info"
                    type="submit"
                    className={`${styles.submitButton}`}
                >
                    {isLoginForm ? 'Login' : 'Register'}
                </Button>

                <Button
                    variant="link"
                    onClick={handleOpenPasswordModal}
                    className={`${styles.customButton}`}
                >
                    Forgot your password?
                </Button>
                <Modal
                    show={showPasswordModal}
                    onHide={handleClosePasswordModal}
                    centered
                >
                    <PasswordResetModal onClose={handleClosePasswordModal} />
                </Modal>

                <Button
                    variant="link"
                    onClick={handleToggleForm}
                    className={`${styles.customButton}`}
                >
                    {isLoginForm ? 'Is not Registered?' : 'Back to Login'}
                </Button>
            </Form>
            {showAlert && (
                <CustomAlert
                    show={showAlert}
                    handleClose={() => {
                        setShowAlert(false);
                    }}
                    message={alertMessage}
                />
            )}
        </Container>
    );
};

export default LoginForm;
