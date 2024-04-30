import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import styles from '../styles/EventPage.module.css';
import EventGuests from './EventGuests';

const EventGuestsModal = ({ event_guests }) => {
    const [showGuestsModal, setShowGuestsModal] = useState(false);

    const handleCloseGuestsModal = () => setShowGuestsModal(false);
    const handleShowGuestsModal = () => setShowGuestsModal(true);

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShowGuestsModal}
                className={styles.button}
            >
                Show Guests
            </Button>

            <Modal show={showGuestsModal} onHide={handleCloseGuestsModal}>
                <Modal.Header
                    closeButton
                    className="bg-dark text-white border-0"
                >
                    <Modal.Title>Guests</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    <EventGuests eventGuests={event_guests} />
                </Modal.Body>
                <Modal.Footer className="bg-dark text-white border-0">
                    <Button
                        variant="secondary"
                        onClick={handleCloseGuestsModal}
                        className="bg-dark text-white"
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EventGuestsModal;
