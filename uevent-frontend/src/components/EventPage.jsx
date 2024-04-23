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

    if (!event) {
        return <div>Loading...</div>;
    }

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
                                <span className={styles.infoText}>
                                    Price: ${event.price}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.infoText}>
                                    Format:{' '}
                                    {getFormat(event.format_id, formats)}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.infoText}>
                                    Theme: {getTheme(event.theme_id, themes)}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.infoText}>
                                    Tickets Available: {event.tickets_available}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.infoText}>
                                    Organiser:{' '}
                                    {getCompanyName(
                                        event.company_id,
                                        companies,
                                    )}
                                </span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.infoText}>
                                    Date: {formatDate(event.date)}
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
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default EventPage;
