import React from 'react';
import { Modal, Button } from 'react-bootstrap';

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
                className={`${styles.modalHeader} bg-dark text-white`}
            >
                <Modal.Title className={`${styles.modalTitle}`}>
                    {company.name}
                    <div className={`text-center mb-3 ${styles.textCenter}`}>
                        <img
                            src={`https://i.kym-cdn.com/photos/images/original/001/265/762/87f.jpg`}
                            alt="Avatar"
                            className={`rounded-circle ${styles.avatar}`}
                        />
                    </div>
                    <p className={styles.modalText}>{company.email}</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <div className={styles.buttonContainer}>
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
            </Modal.Body>
            <Modal.Footer
                className={`${styles.modalHeader} bg-dark text-white`}
            >
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
