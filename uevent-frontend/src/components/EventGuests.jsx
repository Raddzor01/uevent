import React from 'react';
import { Card, Col } from 'react-bootstrap';
import styles from '../styles/EventGuests.module.css';

const EventGuests = ({ eventGuests }) => {
    return (
        <div className={styles.scrollContainer}>
            <div className="d-flex flex-wrap  mt-3">
                {eventGuests.map((guest) => (
                    <Col
                        key={guest.id}
                        md={4}
                        className={`${styles.cardColumn}`}
                    >
                        <Card
                            className={`bg-dark text-light border border-info ${styles.cardHeight}`}
                        >
                            <Card.Img
                                variant="top"
                                src={`http://127.0.0.1:8000/${guest.picture}`}
                            />
                            <Card.Body className="text-center">
                                <Card.Title>{guest.login}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </div>
        </div>
    );
};

export default EventGuests;
