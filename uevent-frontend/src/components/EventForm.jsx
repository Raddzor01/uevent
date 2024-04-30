import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Footer from './Footer';
import SearchBoxContainer from './SearchBoxContainer';
import { createEvent } from '../store/actions/events';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/EventForm.module.css';

const EventForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const companies = useSelector((state) => state.company.companies);
    const themes = useSelector((state) => state.theme.themes);
    const formats = useSelector((state) => state.format.formats);
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDateTime, setEventDateTime] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [company, setCompany] = useState('');
    const [format, setFormat] = useState('');
    const [theme, setTheme] = useState('');
    const [availableTickets, setAvailableTickets] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            createEvent(
                eventName,
                eventDescription,
                eventDateTime,
                ticketPrice,
                availableTickets,
                latitude,
                longitude,
                company,
                format,
                theme,
            ),
        );
        navigate('/');
    };

    return (
        <div>
            <Footer />
            <div className={`container bg-dark ${styles.darkTheme}`}>
                <h2>Create New Event</h2>
                <Form
                    onSubmit={handleSubmit}
                    className={`bg-dark text-white ${styles.modalContent}`}
                >
                    <Form.Group className="mb-3" controlId="eventName">
                        <Form.Label className={styles.label}>
                            Event Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter event name"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="eventDescription">
                        <Form.Label className={styles.label}>
                            Event Description
                        </Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter event description"
                            value={eventDescription}
                            onChange={(e) =>
                                setEventDescription(e.target.value)
                            }
                            required
                            className={styles.input}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="longitude">
                        <Form.Label className={styles.label}>
                            Address
                        </Form.Label>
                        <div className="mb-3">
                            <SearchBoxContainer
                                setLatitude={setLatitude}
                                setLongitude={setLongitude}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="company">
                        <Form.Label className={styles.label}>
                            Company
                        </Form.Label>
                        <Form.Select
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            className={styles.input}
                        >
                            <option value="">Select Company</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="format">
                        <Form.Label className={styles.label}>Format</Form.Label>
                        <Form.Select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            required
                            className={styles.input}
                        >
                            <option value="">Select Format</option>
                            {formats.map((format) => (
                                <option key={format.id} value={format.id}>
                                    {format.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="theme">
                        <Form.Label className={styles.label}>Theme</Form.Label>
                        <Form.Select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            required
                            className={styles.input}
                        >
                            <option value="">Select Theme</option>
                            {themes.map((theme) => (
                                <option key={theme.id} value={theme.id}>
                                    {theme.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="eventDateTime">
                        <Form.Label className={styles.label}>
                            Event Date and Time
                        </Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={eventDateTime}
                            onChange={(e) => setEventDateTime(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="availableTickets">
                        <Form.Label className={styles.label}>
                            Available Tickets
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter number of available tickets"
                            value={availableTickets}
                            onChange={(e) =>
                                setAvailableTickets(e.target.value)
                            }
                            required
                            className={styles.input}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="ticketPrice">
                        <Form.Label className={styles.label}>
                            Ticket Price
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter ticket price"
                            value={ticketPrice}
                            onChange={(e) => setTicketPrice(e.target.value)}
                            required
                            className={styles.input}
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className={styles.button}
                    >
                        Create Event
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default EventForm;
