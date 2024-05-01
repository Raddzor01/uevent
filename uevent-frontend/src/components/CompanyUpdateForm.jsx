import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateCompany } from '../store/actions/company';
import SearchBoxContainer from './SearchBoxContainer';
import AddressDisplay from './AddressDisplay';
import styles from '../styles/CompanyUpdateForm.module.css';
import CustomAlert from './CustomAlert';

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
    const [showAlert, setShowAlert] = useState(false);
    const alertMessage = useSelector((state) => state.auth.message);

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
    };

    return (
        <Modal.Body
            className={`bg-dark text-white border border-white ${styles.modalContent}`}
        >
            <Form onSubmit={handleSubmit} className={`${styles.form}`}>
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
                        Address
                    </Form.Label>
                    <AddressDisplay
                        lat={parseFloat(originalFormData.latitude)}
                        lng={parseFloat(originalFormData.longitude)}
                    />
                    <SearchBoxContainer
                        setLatitude={(latitude) =>
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                latitude: latitude,
                            }))
                        }
                        setLongitude={(longitude) =>
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                longitude: longitude,
                            }))
                        }
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

export default CompanyUpdateForm;
