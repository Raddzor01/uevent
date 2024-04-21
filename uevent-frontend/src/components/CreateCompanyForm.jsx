import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { createCompany } from '../store/actions/company';

import styles from '../styles/CreateCompanyForm.module.css';

const CreateCompanyForm = ({ show, handleClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [picture, setPicture] = useState(null);

    const handleSave = () => {
        dispatch(createCompany(name, email, latitude, longitude));
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-dark">
            <Modal.Header closeButton className="bg-dark text-white">
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
                        <label htmlFor="latitude" className="form-label">
                            Latitude:
                        </label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white"
                            id="latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="longitude" className="form-label">
                            Longitude:
                        </label>
                        <input
                            type="text"
                            className="form-control bg-dark text-white"
                            id="longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="picture" className="form-label">
                            Picture:
                        </label>
                        <input
                            type="file"
                            className="form-control bg-dark text-white"
                            id="picture"
                            onChange={(e) => setPicture(e.target.files[0])}
                        />
                    </div>
                    {picture && (
                        <div className="mb-3">
                            <img
                                src={URL.createObjectURL(picture)}
                                alt="Preview"
                                className="img-fluid mt-2"
                            />
                        </div>
                    )}
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
        </Modal>
    );
};

export default CreateCompanyForm;
