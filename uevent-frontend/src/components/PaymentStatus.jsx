import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/UniversalModal.module.css';

const PaymentStatus = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');

    const handleReturnHome = () => {
        navigate('/');
    };

    return (
        <Modal show={true} centered className={`bg-dark`}>
            <Modal.Header
                closeButton
                className={`bg-dark ${styles.modalHeader}`}
            >
                <Modal.Title>
                    {status === 'true'
                        ? 'Payment successful!'
                        : 'Payment failed!'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={`bg-dark ${styles.modalText}`}>
                <p>
                    {status === 'true'
                        ? 'Your payment has been successfully processed. Thank you for your purchase!'
                        : 'An error occurred while processing the payment. Please try again.'}
                </p>
            </Modal.Body>
            <Modal.Footer className={`bg-dark ${styles.modalFooter}`}>
                <Button
                    variant="primary"
                    onClick={handleReturnHome}
                    className={`${styles.button} mt-4`}
                >
                    Go back to the main page
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentStatus;
