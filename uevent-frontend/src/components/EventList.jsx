import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Container } from 'react-bootstrap';
import Pagination from './Pagination';
import Event from './Event';
import styles from '../styles/EventList.module.css';
import { getAllCompanySubscriptions } from '../store/actions/company';

const EventList = ({ filter, sortByDate, excludeEvent, eventsPerPage }) => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.event.events);
    const companies = useSelector((state) => state.company.companies);
    const themes = useSelector((state) => state.theme.themes);
    const formats = useSelector((state) => state.format.formats);
    const user = useSelector((state) => state.auth.user);
    const subscriptions = useSelector((state) => state.company.subscriptions);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (user) {
            dispatch(getAllCompanySubscriptions());
        }
    }, [dispatch, user]);

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
                        <Event
                            key={event.id}
                            event={event}
                            user={user}
                            subscriptions={subscriptions}
                            companies={companies}
                            themes={themes}
                            formats={formats}
                        />
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
