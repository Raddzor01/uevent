import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { createCompany } from '../store/actions/company';
import SearchBoxContainer from './SearchBoxContainer';

import styles from '../styles/CreateCompanyForm.module.css';
import CustomAlert from './CustomAlert';

const CreateCompanyForm = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const alertMessage = useSelector((state) => state.auth.message);
    const handleSave = () => {
        dispatch(createCompany(name, email, latitude, longitude));
        setShowAlert(true);
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-dark">
            <Modal.Header className="bg-dark text-white">
                <Modal.Title>Create Company</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            className="form-control bg-dark text-white"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            Adress:
                        </label>
                        <SearchBoxContainer
                            setLatitude={setLatitude}
                            setLongitude={setLongitude}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
                <Button
                    variant="secondary"
                    className={`${styles.button} me-auto`}
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    className={styles.button}
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Modal.Footer>
            <CustomAlert
                show={showAlert}
                message={alertMessage}
                handleClose={() => {
                    setShowAlert(false);
                    handleClose();
                    window.location.reload();
                }}
            />
        </Modal>
    );
};

export default CreateCompanyForm;
