import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { passwordReset } from '../store/actions/auth';

const PasswordResetModal = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSendEmail = () => {
        dispatch(passwordReset(email));
        setEmailSent(true);
    };

    return (
        <>
            <Modal.Body className="bg-dark text-white d-flex justify-content-center flex-column">
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Label style={{ fontSize: '1.2rem' }}>
                            Email address
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleChange}
                            required
                            className="bg-dark text-white"
                            style={{ fontSize: '1.2rem' }}
                        />
                    </Form.Group>

                    <div className="text-center">
                        <Button
                            variant="primary"
                            onClick={handleSendEmail}
                            className="btn-dark border-white mt-3"
                            style={{ fontSize: '1.2rem' }}
                        >
                            Send Password Reset Link
                        </Button>
                    </div>
                </Form>
                {emailSent && (
                    <Alert
                        variant="success"
                        className="mt-3 text-center border-0 "
                    >
                        Email with password reset instructions has been sent to{' '}
                        {email}!
                    </Alert>
                )}
            </Modal.Body>
        </>
    );
};

export default PasswordResetModal;
