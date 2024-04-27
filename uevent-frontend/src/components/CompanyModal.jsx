import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, getEventsForCompany } from '../store/actions/events';
import { deleteCompany } from '../store/actions/company';
import { Link } from 'react-router-dom';
import CompanyUpdateForm from './CompanyUpdateForm';
import EventUpdateForm from './EventUpdateForm';
import UniversalModal from './UniversalModal';
import Pagination from './Pagination';
import PaymentButton from './PaymentButton';
import PromoCodeModal from './PromoCodeModal';

import styles from '../styles/CompanyModal.module.css';

const CompanyModal = ({ company, show, handleClose }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.company.events);
    const [showDeleteCompanyModal, setShowDeleteCompanyModal] = useState(false);
    const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
    const [showUpdateCompanyModal, setShowUpdateCompanyModal] = useState(false);
    const [showUpdateEventModal, setShowUpdateEventModal] = useState(false);
    const eventsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(events && events.length / eventsPerPage);
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents =
        events && events.slice(indexOfFirstEvent, indexOfLastEvent);
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    const [isPromoCodeModalOpen, setIsPromoCodeModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleOpenPromoCodeModal = (event) => {
        setSelectedEvent(event);
        setIsPromoCodeModalOpen(true);
    };

    const handleClosePromoCodeModal = () => {
        setIsPromoCodeModalOpen(false);
    };

    const handleOpenUpdateCompanyModal = () => setShowUpdateCompanyModal(true);
    const handleCloseUpdateCompanyModal = () =>
        setShowUpdateCompanyModal(false);

    const handleOpenDeleteEventModal = (eventId) => {
        setShowDeleteEventModal({ ...showDeleteEventModal, [eventId]: true });
    };

    const handleCloseDeleteEventModal = (eventId) => {
        setShowDeleteEventModal({ ...showDeleteEventModal, [eventId]: false });
    };

    const handleOpenUpdateEventModal = (eventId) => {
        setShowUpdateEventModal({ ...showUpdateEventModal, [eventId]: true });
    };

    const handleCloseUpdateEventModal = (eventId) => {
        setShowUpdateEventModal({ ...showUpdateEventModal, [eventId]: false });
    };

    const handleOpenDeleteCompanyModal = () => setShowDeleteCompanyModal(true);
    const handleCloseDeleteCompanyModal = () =>
        setShowDeleteCompanyModal(false);

    useEffect(() => {
        if (company && company.id) {
            dispatch(getEventsForCompany(company.id));
        }
    }, [dispatch, company]);

    if (!company) {
        return null;
    }

    const handleDeleteCompany = (companyId) => {
        dispatch(deleteCompany(companyId));
        window.location.reload();
        handleCloseDeleteCompanyModal();
    };

    const handleDeleteEvent = (eventId) => {
        dispatch(deleteEvent(eventId));
        window.location.reload();
        handleCloseDeleteEventModal();
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
                            src={`http://127.0.0.1:8000/${company.picture_path}`}
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
                        <Button
                            variant="primary"
                            className={styles.button}
                            onClick={handleOpenUpdateCompanyModal}
                        >
                            Update
                        </Button>

                        <Button
                            variant="danger"
                            className={styles.button}
                            onClick={handleOpenDeleteCompanyModal}
                        >
                            Delete
                        </Button>
                        <PaymentButton company={company} />
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
                        {events && events.length > 0 && (
                            <ul>
                                {currentEvents.map((event, index) => (
                                    <li
                                        key={event.id || index}
                                        className={styles.eventItem}
                                    >
                                        <Link
                                            to={`/event/${event.id}`}
                                            className={styles.eventLink}
                                        >
                                            <div className={styles.eventInfo}>
                                                <span
                                                    className={styles.eventName}
                                                >
                                                    {event.name}
                                                </span>
                                            </div>
                                        </Link>
                                        <div className={styles.eventActions}>
                                            <button
                                                className={styles.button}
                                                onClick={() =>
                                                    handleOpenDeleteEventModal(
                                                        event.id,
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className={styles.button}
                                                onClick={() =>
                                                    handleOpenUpdateEventModal(
                                                        event.id,
                                                    )
                                                }
                                            >
                                                Update
                                            </button>
                                            <button
                                                className={styles.button}
                                                onClick={() =>
                                                    handleOpenPromoCodeModal(
                                                        event,
                                                    )
                                                }
                                            >
                                                PROMOCODE
                                            </button>
                                            <UniversalModal
                                                show={
                                                    showDeleteEventModal[
                                                        event.id
                                                    ]
                                                }
                                                onHide={() =>
                                                    handleCloseDeleteEventModal(
                                                        event.id,
                                                    )
                                                }
                                                title="Delete Event Confirmation"
                                                bodyText="Are you sure you want to delete this event?"
                                                handleDelete={() =>
                                                    handleDeleteEvent(event.id)
                                                }
                                                deleteActionText="Delete Event"
                                                confirmationMessage="This action cannot be undone. All associated events will also be deleted."
                                            />
                                        </div>
                                        <Modal
                                            show={
                                                showUpdateEventModal[event.id]
                                            }
                                            onHide={() =>
                                                handleCloseUpdateEventModal(
                                                    event.id,
                                                )
                                            }
                                            centered
                                            className={`bg-dark `}
                                        >
                                            <Modal.Header
                                                closeButton
                                                className={`bg-dark ${styles.modalHeader}`}
                                            >
                                                <Modal.Title>
                                                    Update Event
                                                </Modal.Title>
                                            </Modal.Header>
                                            <EventUpdateForm
                                                event={event}
                                                handleClose={
                                                    handleCloseUpdateEventModal
                                                }
                                            />
                                        </Modal>
                                    </li>
                                ))}
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    prevPage={prevPage}
                                    nextPage={nextPage}
                                    setCurrentPage={setCurrentPage}
                                />
                            </ul>
                        )}

                        {!events ||
                            !events.eventsArray ||
                            (events.eventsArray.length === 0 && (
                                <p className={styles.noEvents}>
                                    No events found.
                                </p>
                            ))}
                    </ul>
                    {isPromoCodeModalOpen && (
                        <PromoCodeModal
                            event={selectedEvent}
                            show={isPromoCodeModalOpen}
                            onClose={handleClosePromoCodeModal}
                        />
                    )}
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
            <UniversalModal
                show={showDeleteCompanyModal}
                onHide={handleCloseDeleteCompanyModal}
                title="Delete Company Confirmation"
                bodyText="Are you sure you want to delete this company?"
                handleDelete={() => handleDeleteCompany(company.id)}
                deleteActionText="Delete Company"
                confirmationMessage="This action cannot be undone. All associated events will also be deleted."
            />
            <Modal
                show={showUpdateCompanyModal}
                onHide={handleCloseUpdateCompanyModal}
                centered
                className={`bg-dark `}
            >
                <Modal.Header
                    closeButton
                    className={`bg-dark ${styles.modalHeader}`}
                >
                    <Modal.Title>Update Company</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`bg-dark ${styles.modalText}`}>
                    <CompanyUpdateForm
                        company={company}
                        handleClose={handleCloseUpdateCompanyModal}
                    />
                </Modal.Body>
            </Modal>
        </Modal>
    );
};

export default CompanyModal;
