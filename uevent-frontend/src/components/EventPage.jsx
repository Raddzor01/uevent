import React, { useEffect, useState } from 'react';
import { Card, Container, Button } from 'react-bootstrap';

import Footer from './Footer';

import styles from '../styles/EventPage.module.css';

const testEvent = {
    id: '1',
    name: 'Test Event',
    description: 'This is a test event for demonstration purposes.',
    price: 20,
    organiser: 'Test Events Co.',
    date: '2024-12-31',
    previewPhoto:
        'https://mykaleidoscope.ru/x/uploads/posts/2022-10/1666361504_9-mykaleidoscope-ru-p-peizazhi-prirodi-krasivo-9.jpg',
};

const getEventData = async (eventId) => {
    if (eventId === '1') {
        return testEvent;
    } else {
        return null;
    }
};

const EventPage = () => {
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEventData('1');
            setEventData(data);
        };

        fetchData();
    }, []);

    if (!eventData) {
        return <div>Loading...</div>;
    }

    const { name, description, price, organiser, date, previewPhoto } =
        eventData;

    return (
        <div>
            <Footer />
            <Container className={` ${styles.container}`}>
                <Card className={`${styles.card} border-0`}>
                    <Card.Img
                        variant="top"
                        src={previewPhoto}
                        className={`${styles.image} rounded-top`}
                    />
                    <Card.Body>
                        <Card.Title
                            className={`mb-4 text-center ${styles.title}`}
                        >
                            {name}
                        </Card.Title>
                        <Card.Text
                            className={`mb-3 text-center ${styles.description}`}
                        >
                            {description}
                        </Card.Text>
                        <div
                            className={`d-flex justify-content-around ${styles.infoContainer}`}
                        >
                            <div className={`mb-4 text-center ${styles.info}`}>
                                <strong className={styles.infoLabel}>
                                    Price:
                                </strong>{' '}
                                <span className={styles.infoText}>
                                    ${price}
                                </span>
                            </div>
                            <div className={`mb-4 text-center ${styles.info}`}>
                                <strong className={styles.infoLabel}>
                                    Organiser:
                                </strong>{' '}
                                <span className={styles.infoText}>
                                    {organiser}
                                </span>
                            </div>
                            <div className={`mb-4 text-center ${styles.info}`}>
                                <strong className={styles.infoLabel}>
                                    Date:
                                </strong>{' '}
                                <span className={styles.infoText}>{date}</span>
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
