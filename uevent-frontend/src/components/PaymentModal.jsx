import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createPayment } from '../store/actions/events';

import styles from '../styles/UniversalModal.module.css';

const PaymentModal = ({ show, handleClose, event }) => {
    const dispatch = useDispatch();
    const [promoCode, setPromoCode] = useState('');
    const [allowDisplay, setAllowDisplay] = useState(false);

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setAllowDisplay(e.target.checked);
    };

    const handleSubmit = async () => {
        await dispatch(createPayment(event.id, Number(allowDisplay), promoCode))
            .then((response) => {
                if (response === -1) {
                    window.open(`/event/payment/?status=true`);
                } else {
                    window.open(response);
                }
            })
            .catch((error) => {
                console.error('Error handling payment confirmation:', error);
            });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered className={`bg-dark`}>
            <Modal.Header
                closeButton
                className={`bg-dark ${styles.modalHeader}`}
            >
                <Modal.Title>Enter PROMOCODE</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`bg-dark ${styles.modalText}`}>
                <Form.Group controlId="promoCode">
                    <Form.Label>
                        Promocode. If you don't have a promo code, skip it.
                    </Form.Label>
                    <Form.Control
                        type="text"
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                        placeholder="Введите ваш промокод"
                        className={`bg-dark mt-2 text-white`}
                    />
                </Form.Group>
                <Form.Check
                    type="checkbox"
                    id="allowDisplay"
                    label="Do you allow us to display you in the list of participants?"
                    checked={allowDisplay}
                    onChange={handleCheckboxChange}
                    className={`bg-dark mt-2`}
                />
            </Modal.Body>
            <Modal.Footer className={`bg-dark ${styles.modalFooter}`}>
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    className={`${styles.button} mt-4`}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    className={`${styles.button} mt-4`}
                >
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentModal;
