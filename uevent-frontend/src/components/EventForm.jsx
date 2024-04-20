import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Footer from './Footer';
import styles from '../styles/EventForm.module.css';

const EventForm = () => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDateTime, setEventDateTime] = useState('');
    const [eventPhoto, setEventPhoto] = useState(null);
    const [ticketPrice, setTicketPrice] = useState('');
    const [notificationChecked, setNotificationChecked] = useState(false);
    const [visibilityOption, setVisibilityOption] = useState('public');
    const [redirectPage, setRedirectPage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted!');
    };

    const handleFileChange = (e) => {
        setEventPhoto(e.target.files[0]);
    };

    return (
        <div>
            {' '}
            <Footer />
            <div className={`container ${styles.darkTheme}`}>
                <h2>Create New Event</h2>
                <Form onSubmit={handleSubmit}>
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
                    <Form.Group className="mb-3" controlId="eventPhoto">
                        <Form.Label className={styles.label}>
                            Event Photo
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className={styles.input}
                        />
                        {eventPhoto && (
                            <img
                                src={URL.createObjectURL(eventPhoto)}
                                alt="Event Preview"
                                className="mt-2"
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                        )}
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

                    <Form.Check
                        type="checkbox"
                        label="Receive notifications about new visitors"
                        checked={notificationChecked}
                        onChange={(e) =>
                            setNotificationChecked(e.target.checked)
                        }
                        className={styles.checkbox}
                    />

                    <Form.Check
                        type="radio"
                        label="Public - Everybody can see the list of event visitors"
                        name="visibilityOption"
                        id="publicVisibilityRadio"
                        checked={visibilityOption === 'public'}
                        onChange={() => setVisibilityOption('public')}
                        className={styles.radio}
                    />
                    <Form.Check
                        type="radio"
                        label="Private - Only users who are going to the event can see the list of event visitors"
                        name="visibilityOption"
                        id="privateVisibilityRadio"
                        checked={visibilityOption === 'private'}
                        onChange={() => setVisibilityOption('private')}
                        className={styles.radio}
                    />

                    <Form.Group className="mb-3" controlId="redirectPage">
                        <Form.Label className={styles.label}>
                            Redirect Page After Ticket Purchase
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter redirect page URL"
                            value={redirectPage}
                            onChange={(e) => setRedirectPage(e.target.value)}
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
