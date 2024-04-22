import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { getEvents } from '../store/actions/events';
import { getCompanies } from '../store/actions/company';
import styles from '../styles/EventList.module.css';

const EventList = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.events.eventsArray);
    const companies = useSelector((state) => state.company.companies);
    useEffect(() => {
        dispatch(getEvents());
        dispatch(getCompanies());
    }, [dispatch]);

    const eventsPerPage = 6;
    const totalPages = Math.ceil(events.length / eventsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    if (!events) {
        return <div>Loading</div>;
    }

    const getCompanyName = (companyId) => {
        const company = companies.find((company) => company.id === companyId);
        return company ? company.name : 'Unknown';
    };

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
                                    src={`https://206329.selcdn.ru/BHAGs-media/upload/activity_banners/e2a1cca6-f9d9-42ed-be13-3f0415b25514.jpg`}
                                    className={styles.image}
                                />{' '}
                                <Card.Body>
                                    <Card.Title>{event.name}</Card.Title>
                                    <Card.Text className={styles.description}>
                                        {event.description}
                                    </Card.Text>
                                    <p>Price: ${event.price}</p>
                                    <p>
                                        Organiser:{' '}
                                        {getCompanyName(event.company_id)}
                                    </p>
                                    <p>Date: {formatDate(event.date)}</p>
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
