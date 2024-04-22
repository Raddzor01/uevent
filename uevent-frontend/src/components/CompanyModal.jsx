import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsForCompany } from '../store/actions/events';
import { deleteCompany } from '../store/actions/company';
import { Link } from 'react-router-dom';

import styles from '../styles/CompanyModal.module.css';

const CompanyModal = ({ company, show, handleClose }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.company.events);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    useEffect(() => {
        if (company && company.id) {
            dispatch(getEventsForCompany(company.id));
        }
    }, [dispatch, company]);
    if (!company) {
        return null;
    }
    const handleDeleteCompany = (eventId) => {
        dispatch(deleteCompany(eventId));
        handleCloseDeleteModal();
    };
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
                        <Button
                            variant="danger"
                            className={styles.button}
                            onClick={handleOpenDeleteModal}
                        >
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
                <div className={styles.eventsContainer}>
                    <h3 className={styles.eventsHeader}>Events</h3>
                    <ul className={styles.eventsList}>
                        {events.eventsArray.map((event, index) => (
                            <li
                                key={event.id || index}
                                className={styles.eventItem}
                            >
                                {event.name}
                            </li>
                        ))}
                    </ul>
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
            <Modal
                show={showDeleteModal}
                onHide={handleCloseDeleteModal}
                centered
                className={`bg-dark `}
            >
                <Modal.Header
                    closeButton
                    className={`bg-dark ${styles.modalHeader}`}
                >
                    <Modal.Title>Delete Event Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`bg-dark ${styles.modalText}`}>
                    Are you sure you want to delete this event? This action
                    cannot be undone.
                </Modal.Body>
                <Modal.Footer className={`bg-dark ${styles.modalFooter}`}>
                    <Button
                        variant="secondary"
                        onClick={handleCloseDeleteModal}
                        className={styles.button}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDeleteCompany(company.id)}
                        className={styles.button}
                    >
                        Delete Company
                    </Button>
                </Modal.Footer>
            </Modal>
        </Modal>
    );
};

export default CompanyModal;
