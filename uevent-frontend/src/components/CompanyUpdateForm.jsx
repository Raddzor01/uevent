import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateCompany } from '../store/actions/company';
import styles from '../styles/CompanyUpdateForm.module.css';

const CompanyUpdateForm = ({ company, handleClose }) => {
    const dispatch = useDispatch();
    const [originalFormData] = useState({
        name: company.name,
        email: company.email,
        latitude: company.latitude,
        longitude: company.longitude,
    });
    const [formData, setFormData] = useState({
        name: company.name,
        email: company.email,
        latitude: company.latitude,
        longitude: company.longitude,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const changedFields = {};
        for (const key in formData) {
            if (formData[key] !== originalFormData[key]) {
                changedFields[key] = formData[key];
            }
        }

        if (Object.keys(changedFields).length > 0) {
            dispatch(updateCompany(company.id, changedFields));
        }

        handleClose();
        window.location.reload();
    };

    return (
        <Modal.Body className={`bg-dark text-white ${styles.modalContent}`}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Form.Group
                    controlId="formCompanyName"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Company Name
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
                        Latitude
                    </Form.Label>
                    <Form.Control
                        type="number"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formCompanyLongitude"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Longitude
                    </Form.Label>
                    <Form.Control
                        type="number"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className={`${styles.updateButton} mt-4`}
                >
                    Update
                </Button>
            </Form>
        </Modal.Body>
    );
};

export default CompanyUpdateForm;
