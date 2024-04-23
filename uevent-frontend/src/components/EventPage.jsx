import React, { useEffect } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEvent } from '../store/actions/events';
import { getFormat } from '../services/formatService';
import { getTheme } from '../services/themeService';
import { getCompanyName } from '../services/companyService';
import Footer from './Footer';

import styles from '../styles/EventPage.module.css';

const EventPage = () => {
    const dispatch = useDispatch();
    const { eventId } = useParams();
    const companies = useSelector((state) => state.company.companies);
    const event = useSelector((state) => state.event.event);
    const themes = useSelector((state) => state.theme.themes);
    const formats = useSelector((state) => state.format.formats);
    useEffect(() => {
        dispatch(getEvent(eventId));
    }, [dispatch, eventId]);

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return new Date(dateString).toLocaleString('en-US', options);
    };

    const handleUpdateEvent = (updatedEventData) => {
        // dispatch(updateEvent(eventId, updatedEventData))
        //     .then(() => {
        //         setEditMode(false); // Exit edit mode after successful update
        //         // Optionally display a success message here
        //     })
        //     .catch((error) => {
        //         console.error('Error updating event:', error);
        //         // Handle update error (e.g., display an error message to the user)
        //     });
    };

    const handleDeleteEvent = () => {
        // dispatch(deleteEvent(eventId))
        //     .then(() => {
        //         navigate('/events'); // Redirect to events list after deletion
        //     })
        //     .catch((error) => {
        //         console.error('Error deleting event:', error);
        //         // Handle delete error (e.g., display an error message to the user)
        //     });
    };

    if (!event) {
        return <div>Loading...</div>;
    }

    console.log(event);

    return (
        <div>
            <Footer />
            <Container className={` ${styles.container}`}>
                <Card className={`${styles.card} border-0`}>
                    <Card.Img
                        variant="top"
                        src={`https://206329.selcdn.ru/BHAGs-media/upload/activity_banners/e2a1cca6-f9d9-42ed-be13-3f0415b25514.jpg`}
                        className={`${styles.image} rounded-top`}
                    />
                    <Card.Body>
                        <Card.Title
                            className={`mb-4 text-center ${styles.title}`}
                        >
                            {event.name}
                        </Card.Title>
                        <Card.Text
                            className={`mb-3 text-center ${styles.description}`}
                        >
                            {event.description}
                        </Card.Text>
                        <div className={styles.infoContainer}>
                            <div className={styles.info}>
                                <span className={styles.infoLabel}>Price:</span>
                                <span className={styles.infoText}>
                                    ${event.price}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.infoLabel}>
                                    Format:
                                </span>
                                <span className={styles.infoText}>
                                    {getFormat(event.format_id, formats)}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.infoLabel}>Theme:</span>
                                <span className={styles.infoText}>
                                    {getTheme(event.theme_id, themes)}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.infoLabel}>
                                    Tickets Available:
                                </span>
                                <span className={styles.infoText}>
                                    {event.tickets_available}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.infoLabel}>
                                    Organiser:
                                </span>
                                <span className={styles.infoText}>
                                    {getCompanyName(
                                        event.company_id,
                                        companies,
                                    )}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.infoLabel}>Date:</span>
                                <span className={styles.infoText}>
                                    {formatDate(event.date)}
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <Button
                                variant="primary"
                                className={`mt-4 ${styles.buyButton} w-100`}
                            >
                                Buy Ticket
                            </Button>
                        </div>

                        <div className="text-center mb-3">
                            <Button
                                variant="primary"
                                className={`mt-2 ${styles.button} w-50 smallButton`} // Add `smallButton` class
                                onClick={() => handleUpdateEvent()}
                            >
                                Update Event
                            </Button>
                            <Button
                                variant="danger"
                                className={`mt-2 ${styles.button} w-50`}
                                onClick={handleDeleteEvent}
                            >
                                Delete Event
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default EventPage;
