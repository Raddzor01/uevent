import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { setNewPassword } from '../store/actions/auth';

const ChangePasswordModal = () => {
    const dispatch = useDispatch();
    const [newPassword, setPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const extractTokenFromUrl = () => {
            const url = window.location.pathname;
            const tokenFromUrl = url.substring(url.lastIndexOf('/') + 1);
            if (tokenFromUrl) {
                setToken(tokenFromUrl);
            }
        };
        extractTokenFromUrl();
    }, [dispatch, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') setPassword(value);
        if (name === 'confirmNewPassword') setConfirmNewPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match');
            return;
        }
        dispatch(setNewPassword(token, newPassword))
            .then(() => {
                setSuccess(true);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleRedirect = () => {
        window.location.href = '/login';
    };

    return (
        <Modal show={true} centered>
            <Modal.Header closeButton className="bg-dark text-white border-0">
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                {success ? (
                    <>
                        <Alert variant="success">
                            Password changed successfully!
                        </Alert>
                        <div className="text-center mt-3">
                            <Button
                                variant="primary"
                                onClick={handleRedirect}
                                className="btn-dark border-white mt-3"
                            >
                                OK
                            </Button>
                        </div>
                    </>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={handleChange}
                                required
                                className="bg-dark text-white"
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmNewPassword">
                            <Form.Label className="mt-2">
                                Confirm New Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmNewPassword"
                                value={confirmNewPassword}
                                onChange={handleChange}
                                required
                                className="bg-dark text-white"
                            />
                        </Form.Group>
                        {error && <p className="text-danger">{error}</p>}
                        <div className="text-center">
                            <Button
                                variant="primary"
                                type="submit"
                                className="btn-dark border-white mt-3"
                            >
                                Change Password
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ChangePasswordModal;
