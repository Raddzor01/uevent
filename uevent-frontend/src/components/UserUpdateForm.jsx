import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Modal } from 'react-bootstrap';
import { updateUser } from '../store/actions/user';
import CustomAlert from './CustomAlert';

import styles from '../styles/CompanyUpdateForm.module.css';

const UserUpdateForm = ({ user, handleClose }) => {
    const dispatch = useDispatch();
    const [originalFormData] = useState({
        name: user.name,
        email: user.email,
        full_name: user.full_name,
        password: user.password,
    });
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        full_name: user.full_name,
        password: user.password,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [showAlert, setShowAlert] = useState(false);
    const alertMessage = useSelector((state) => state.auth.message);

    const handleSubmit = (e) => {
        e.preventDefault();

        const changedFields = {};
        for (const key in formData) {
            if (formData[key] !== originalFormData[key]) {
                changedFields[key] = formData[key];
            }
        }

        if (Object.keys(changedFields).length > 0) {
            dispatch(updateUser(user.id, changedFields));
        }
    };

    return (
        <Modal.Body className={`bg-dark text-white ${styles.modalContent}`}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Form.Group
                    controlId="formUserName"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        User Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formCompanyEmail"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Email address
                    </Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formCompanyLatitude"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Full Name
                    </Form.Label>
                    <Form.Control
                        type="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className={`${styles.updateButton} mt-4`}
                    onClick={() => {
                        setShowAlert(true);
                    }}
                >
                    Update
                </Button>
            </Form>
            <CustomAlert
                show={showAlert}
                handleClose={() => {
                    setShowAlert(false);
                    handleClose();
                    window.location.reload();
                }}
                message={alertMessage}
            />
        </Modal.Body>
    );
};

export default UserUpdateForm;
