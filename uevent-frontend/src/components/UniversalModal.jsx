import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

import styles from '../styles/UniversalModal.module.css';

const UniversalModal = ({
    show,
    onHide,
    title,
    bodyText,
    deleteActionText = 'Delete',
    handleDelete,
    cancelText = 'Cancel',
    confirmationMessage,
}) => {
    return (
        <Modal show={show} onHide={onHide} centered className={`bg-dark`}>
            <Modal.Header
                closeButton
                className={`bg-dark ${styles.modalHeader}`}
            >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`bg-dark ${styles.modalText}`}>
                {bodyText}
                {handleDelete && confirmationMessage && (
                    <p className={styles.confirmationText}>
                        {confirmationMessage}
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer className={`bg-dark ${styles.modalFooter}`}>
                <Button
                    variant="secondary"
                    onClick={onHide}
                    className={styles.button}
                >
                    {cancelText}
                </Button>
                {handleDelete && (
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        className={styles.button}
                    >
                        {deleteActionText}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default UniversalModal;
