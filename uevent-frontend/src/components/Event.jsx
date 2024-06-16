import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import AddressDisplay from './AddressDisplay';
import { useDispatch } from 'react-redux';
import {
    subscribeToCompany,
    unsubscribeToCompany,
} from '../store/actions/company';
import { getFormat } from '../services/formatService';
import { getTheme } from '../services/themeService';
import { getCompanyName } from '../services/companyService';
import { formatDate } from '../store/actions/data';
import styles from '../styles/EventList.module.css';

function Event({ event, companies, themes, formats, user, subscriptions }) {
    const dispatch = useDispatch();
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if (user) {
            setIsSubscribed((prevIsSubscribed) =>
                subscriptions.some(
                    (sub) =>
                        sub.company_id === event.company_id &&
                        sub.user_id === user.id,
                ),
            );
        }
    }, [subscriptions, event.company_id, user]);

    const handleSubscriptionToggle = (e) => {
        e.preventDefault();
        if (isSubscribed) {
            dispatch(unsubscribeToCompany(event.company_id));
        } else {
            dispatch(subscribeToCompany(event.company_id));
        }
    };

    return (
        <Col key={event.id} className={styles.eventCol}>
            <Link
                to={`/event/${event.id}`}
                className={`text-decoration-none ${styles.link}`}
            >
                <Card className={`bg-dark text-white ${styles.card}`}>
                    <Card.Img
                        variant="top"
                        src={`http://127.0.0.1:8000/${event.picture}`}
                        className={styles.image}
                    />
                    <Card.Body>
                        <div className={styles.content}>
                            <div className={styles.header}>
                                <Card.Title className={styles.title}>
                                    {event.name}
                                </Card.Title>
                                <p className={styles.date}>
                                    {formatDate(event.date)}
                                </p>
                                <AddressDisplay
                                    lat={parseFloat(event.latitude)}
                                    lng={parseFloat(event.longitude)}
                                />
                            </div>
                            <hr className={styles.divider} />
                            <Card.Text className={`${styles.description} mb-3`}>
                                {event.description}
                            </Card.Text>
                            <div className={styles.details}>
                                <p className={styles.detail}>
                                    <span className={styles.label}>Price:</span>{' '}
                                    ${event.price}
                                </p>
                                <p className={styles.detail}>
                                    <span className={styles.label}>Theme:</span>{' '}
                                    {getTheme(event.theme_id, themes)}
                                </p>
                                <p className={styles.detail}>
                                    <span className={styles.label}>
                                        Format:
                                    </span>{' '}
                                    {getFormat(event.format_id, formats)}
                                </p>
                                <p className={styles.detail}>
                                    <span className={styles.label}>
                                        Tickets Available:
                                    </span>{' '}
                                    {event.tickets_available}
                                </p>
                                <p className={styles.detail}>
                                    <span className={styles.label}>
                                        Organiser:
                                    </span>{' '}
                                    {getCompanyName(
                                        event.company_id,
                                        companies,
                                    )}
                                    <br></br>
                                    <button
                                        onClick={(e) =>
                                            handleSubscriptionToggle(e)
                                        }
                                        className={styles.button}
                                    >
                                        {isSubscribed
                                            ? 'Unsubscribe'
                                            : 'Subscribe'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
}

export default Event;
