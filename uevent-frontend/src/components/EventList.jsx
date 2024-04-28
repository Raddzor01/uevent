import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { getFormat } from '../services/formatService';
import { getTheme } from '../services/themeService';
import { getCompanyName } from '../services/companyService';
import AddressDisplay from './AddressDisplay';
import styles from '../styles/EventList.module.css';

const EventList = ({ filter, sortByDate, excludeEvent, eventsPerPage }) => {
    const events = useSelector((state) => state.event.events);
    const companies = useSelector((state) => state.company.companies);
    const themes = useSelector((state) => state.theme.themes);
    const formats = useSelector((state) => state.format.formats);
    const [currentPage, setCurrentPage] = useState(1);

    if (!events) {
        return <div>Loading</div>;
    }

    const filteredEvents =
        events &&
        events.filter((event) => {
            if (excludeEvent) {
                return (
                    (!filter.theme ||
                        event.theme_id === filter.theme ||
                        !filter.format ||
                        event.format_id === filter.format) &&
                    event.id !== excludeEvent
                );
            } else {
                return (
                    (!filter.theme || event.theme_id === filter.theme) &&
                    (!filter.format || event.format_id === filter.format)
                );
            }
        });

    const sortedEvents = [...filteredEvents].sort((event1, event2) => {
        if (sortByDate === 'asc') {
            return new Date(event1.date) - new Date(event2.date);
        } else {
            return new Date(event2.date) - new Date(event1.date);
        }
    });

    const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);

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

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = sortedEvents.slice(
        indexOfFirstEvent,
        indexOfLastEvent,
    );

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    return (
        <Container fluid>
            {currentEvents.length > 0 ? (
                <Row xs={1} md={2} lg={3} className={styles.eventContainer}>
                    {currentEvents.map((event, index) => (
                        <Col key={index} className={styles.eventCol}>
                            <Link
                                to={`/event/${event.id}`}
                                className={`text-decoration-none ${styles.link}`}
                            >
                                <Card
                                    className={`bg-dark text-white ${styles.card}`}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={`http://127.0.0.1:8000/${event.picture}`}
                                        className={styles.image}
                                    />
                                    <Card.Body>
                                        <div className={styles.content}>
                                            <div className={styles.header}>
                                                <Card.Title
                                                    className={styles.title}
                                                >
                                                    {event.name}
                                                </Card.Title>
                                                <p className={styles.date}>
                                                    {formatDate(event.date)}
                                                </p>
                                                <AddressDisplay
                                                    lat={parseFloat(
                                                        event.latitude,
                                                    )}
                                                    lng={parseFloat(
                                                        event.longitude,
                                                    )}
                                                />
                                            </div>
                                            <hr className={styles.divider} />
                                            <Card.Text
                                                className={`${styles.description} mb-3`}
                                            >
                                                {event.description}
                                            </Card.Text>
                                            <div className={styles.details}>
                                                <p className={styles.detail}>
                                                    <span
                                                        className={styles.label}
                                                    >
                                                        Price:
                                                    </span>{' '}
                                                    ${event.price}
                                                </p>
                                                <p className={styles.detail}>
                                                    <span
                                                        className={styles.label}
                                                    >
                                                        Theme:
                                                    </span>{' '}
                                                    {getTheme(
                                                        event.theme_id,
                                                        themes,
                                                    )}
                                                </p>
                                                <p className={styles.detail}>
                                                    <span
                                                        className={styles.label}
                                                    >
                                                        Format:
                                                    </span>{' '}
                                                    {getFormat(
                                                        event.format_id,
                                                        formats,
                                                    )}
                                                </p>
                                                <p className={styles.detail}>
                                                    <span
                                                        className={styles.label}
                                                    >
                                                        Tickets Available:
                                                    </span>{' '}
                                                    {event.tickets_available}
                                                </p>
                                                <p className={styles.detail}>
                                                    <span
                                                        className={styles.label}
                                                    >
                                                        Organiser:
                                                    </span>{' '}
                                                    {getCompanyName(
                                                        event.company_id,
                                                        companies,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p
                    className="text-center mt-4 mb-4"
                    style={{ fontSize: '1.5rem', color: 'white' }}
                >
                    No events found :(
                </p>
            )}
            {currentEvents.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </Container>
    );
};

export default EventList;
