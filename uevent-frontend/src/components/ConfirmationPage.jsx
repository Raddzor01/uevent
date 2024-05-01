import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { confirmAccount } from '../store/actions/auth';

import styles from '../styles/UniversalModal.module.css';

const ConfirmationPage = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [confirmationStatus, setConfirmationStatus] =
        useState('Processing...');

    useEffect(() => {
        const extractTokenFromUrl = () => {
            const url = window.location.pathname;
            const tokenFromUrl = url.substring(url.lastIndexOf('/') + 1);
            if (tokenFromUrl) {
                setToken(tokenFromUrl);
            }
        };

        const simulateConfirmationProcess = async () => {
            try {
                dispatch(confirmAccount(token));
                setConfirmationStatus('Activation successful');
            } catch (error) {
                setConfirmationStatus('Activation failed');
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        extractTokenFromUrl();
        if (token) {
            simulateConfirmationProcess();
        }
    }, [dispatch, token]);

    return (
        <div>
            <Modal
                show={!isLoading}
                onHide={() => {}}
                centered
                className={`bg-dark`}
            >
                <Modal.Header className={`bg-dark ${styles.modalHeader}`}>
                    <Modal.Title>Confirmation Status</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`bg-dark ${styles.modalText}`}>
                    <p>{confirmationStatus}</p>
                    {error && <p>Error: {error}</p>}
                </Modal.Body>
                <Modal.Footer className={`bg-dark ${styles.modalFooter}`}>
                    <Button
                        variant="primary"
                        onClick={() => {
                            window.location.href = '/login';
                        }}
                        className={styles.button}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ConfirmationPage;
