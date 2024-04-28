import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import UniversalModal from './UniversalModal';
import { createCompanyStripe } from '../store/actions/company';
import styles from '../styles/CompanyModal.module.css';

const PaymentButton = ({ company }) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handlePaymentConfirmation = () => {
        setShowModal(false);
        dispatch(createCompanyStripe(company.id))
            .then((response) => {
                window.open(response);
            })
            .catch((error) => {
                console.error('Error handling payment confirmation:', error);
            });
    };

    return (
        <>
            <Button
                variant="success"
                className={styles.button}
                onClick={() => setShowModal(true)}
            >
                Payment
            </Button>

            <UniversalModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title="Payment Confirmation"
                bodyText="Are you sure you want to connect your company to the payment system?"
                confirmationMessage="This action cannot be undone."
                handleDelete={handlePaymentConfirmation}
                cancelText="No"
                deleteActionText="Yes"
            />
        </>
    );
};

export default PaymentButton;
