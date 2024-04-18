import React, { useState } from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import styles from '../styles/EventList.module.css';

const events = [
    {
        id: 1,
        name: 'Conference on Technology',
        description: 'A conference discussing the latest trends in technology.',
        price: 50,
        previewPhoto:
            'https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg',
        organiser: 'Tech Events Co.',
        date: '2024-05-15',
    },
    {
        id: 1,
        name: 'Conference on Technology',
        description: 'A conference discussing the latest trends in technology.',
        price: 50,
        previewPhoto:
            'https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg',
        organiser: 'Tech Events Co.',
        date: '2024-05-15',
    },
    {
        id: 1,
        name: 'Conference on Technology',
        description: 'A conference discussing the latest trends in technology.',
        price: 50,
        previewPhoto:
            'https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg',
        organiser: 'Tech Events Co.',
        date: '2024-05-15',
    },
    {
        id: 1,
        name: 'Conference on Technology',
        description: 'A conference discussing the latest trends in technology.',
        price: 50,
        previewPhoto:
            'https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg',
        organiser: 'Tech Events Co.',
        date: '2024-05-15',
    },
    {
        id: 1,
        name: 'Conference on Technology',
        description: 'A conference discussing the latest trends in technology.',
        price: 50,
        previewPhoto:
            'https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg',
        organiser: 'Tech Events Co.',
        date: '2024-05-15',
    },
    {
        id: 1,
        name: 'Music Festival',
        description: 'A weekend full of live music performances.',
        price: 100,
        previewPhoto:
            'https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg',
        organiser: 'Music Events LLC',
        date: '2024-06-20',
    },
    {
        id: 1,
        name: 'Music Festival',
        description: 'A weekend full of live music performances.',
        price: 100,
        previewPhoto:
            'https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg',
        organiser: 'Music Events LLC',
        date: '2024-06-20',
    },
];

const EventList = () => {
    // Pagination
    const eventsPerPage = 6;
    const totalPages = Math.ceil(events.length / eventsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    return (
        <Container fluid>
            <Row xs={1} md={2} lg={3}>
                {currentEvents.map((event, index) => (
                    <Col key={index} className={styles.event}>
                        <Link
                            to={`/event/${event.id}`}
                            className="text-decoration-none"
                        >
                            <Card className={`bg-dark text-white`}>
                                <Card.Img
                                    variant="top"
                                    src={event.previewPhoto}
                                    className={styles.image}
                                />{' '}
                                <Card.Body>
                                    <Card.Title>{event.name}</Card.Title>
                                    <Card.Text className={styles.description}>
                                        {event.description}
                                    </Card.Text>
                                    <p>Price: ${event.price}</p>
                                    <p>Organiser: {event.organiser}</p>
                                    <p>Date: {event.date}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                prevPage={prevPage}
                nextPage={nextPage}
                setCurrentPage={setCurrentPage}
            />
        </Container>
    );
};

export default EventList;
