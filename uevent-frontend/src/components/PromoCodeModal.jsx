import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
import {
    createPromoCode,
    deletePromoCode,
    getPromoCodes,
} from '../store/actions/promocode';
import UniversalModal from './UniversalModal';

import styles from '../styles/PromoCodeModal.module.css';

function PromoCodeModal({ event, onClose, show }) {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [selectedPromoCodeId, setSelectedPromoCodeId] = useState(null);
    const promoCodes = useSelector((state) => state.promocode.promocodes);

    useEffect(() => {
        dispatch(getPromoCodes(event.id));
    }, [dispatch, event]);

    const handleCreatePromoCode = () => {
        dispatch(createPromoCode(code, discount, event.id));
        setCode('');
        setDiscount('');
    };

    const handleDeletePromoCode = (id) => {
        setSelectedPromoCodeId(id);
    };

    const handleConfirmDelete = () => {
        dispatch(deletePromoCode(selectedPromoCodeId));
    };

    return (
        <Modal centered className={`bg-dark `} show={show} onHide={onClose}>
            <Modal.Header
                closeButton
                className={`bg-dark ${styles.modalHeader}`}
            >
                <Modal.Title>Promotion Codes</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <Form>
                    <Form.Group controlId="formPromoCode">
                        <Form.Label>Promo Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter promo code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className={`${styles.input}`}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDiscount" className="mt-4 ">
                        <Form.Label>Discount</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter discount"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            className={`${styles.input}`}
                        />
                    </Form.Group>
                    <Button
                        variant="success"
                        onClick={handleCreatePromoCode}
                        className={`${styles.updateButton} mt-4`}
                    >
                        Create
                    </Button>
                </Form>
                <hr />
                <h5>Current Promo Codes:</h5>
                <div className={`${styles.promoCodesContainer}`}>
                    <ListGroup className="bg-dark text-white">
                        {promoCodes.map((code) => (
                            <ListGroup.Item
                                key={code.id}
                                className={styles.customListItem}
                            >
                                <div className="container">
                                    <h1>
                                        {code.code} - {code.discount}%
                                    </h1>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button
                                        variant="danger"
                                        className={`${styles.button}`}
                                        onClick={() =>
                                            handleDeletePromoCode(code.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                                {selectedPromoCodeId === code.id && (
                                    <UniversalModal
                                        show={true}
                                        onHide={() =>
                                            setSelectedPromoCodeId(null)
                                        }
                                        title="Delete PromoCode Confirmation"
                                        bodyText="Are you sure you want to delete this promocode?"
                                        handleDelete={handleConfirmDelete}
                                        deleteActionText="Delete PromoCode"
                                        confirmationMessage="This action cannot be undone. All associated events will also be deleted."
                                    />
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default PromoCodeModal;
