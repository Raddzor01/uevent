import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from '../styles/CompanyModal.module.css';

const CompanyModal = ({ company, show, handleClose }) => {
    if (!company) {
        return null;
    }
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className={styles.modalContent}
        >
            <Modal.Header
                className={`${styles.modalHeader} bg-dark text-white border-0`}
            >
                <Modal.Title className={`${styles.modalTitle}`}>
                    {company.name}
                    <div className={`text-center mb-3 ${styles.textCenter}`}>
                        <img
                            src={`https://www.rmpsrl.net/wp-content/uploads/2017/02/CP_logo_black-2.jpg`}
                            alt="Avatar"
                            className={`rounded-circle ${styles.avatar}`}
                        />
                    </div>
                    <p className={styles.modalText}>{company.email}</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <div className={styles.buttonContainer}>
                    <div className={styles.buttonRow}>
                        <Button variant="primary" className={styles.button}>
                            Update
                        </Button>
                        <Button variant="danger" className={styles.button}>
                            Delete
                        </Button>
                        <Button variant="success" className={styles.button}>
                            Payment
                        </Button>
                    </div>
                    <div className={styles.buttonRow}>
                        <Link to={`/eventform`} className={styles.link}>
                            <Button
                                className={`${styles.button} ${styles.createButton}`}
                            >
                                Create Event
                            </Button>
                        </Link>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="bg-dark text-white border-0">
                <Button
                    variant="secondary"
                    onClick={handleClose}
                    className={styles.button}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CompanyModal;
