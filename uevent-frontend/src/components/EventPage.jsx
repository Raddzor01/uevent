import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, Container, Button, Form, Col, Row } from 'react-bootstrap';

import { getEvent } from '../store/actions/events';
import { getFormat } from '../services/formatService';
import { getTheme } from '../services/themeService';
import { getCompanyName } from '../services/companyService';
import {
    createComment,
    getComments,
    deleteComment,
    updateComment,
} from '../store/actions/comments';
import { getCommentsUsers, getEventGuests } from '../store/actions/user';
import { formatDate } from '../store/actions/data';

import MapWithAddress from './MapWithAddress';
import Footer from './Footer';
import EventList from './EventList';
import UniversalModal from './UniversalModal';
import PaymentModal from './PaymentModal';
import EventGuestsModal from './EventGuestsModal';

import styles from '../styles/EventPage.module.css';

const EventPage = () => {
    const dispatch = useDispatch();

    const { eventId } = useParams();

    const companies = useSelector((state) => state.company.companies);
    const comments = useSelector((state) => state.comment.comments);
    const user = useSelector((state) => state.auth.user);
    const users = useSelector((state) => state.user.comments_users);
    const event = useSelector((state) => state.event.event);
    const event_guests = useSelector((state) => state.event.event_guests);
    const themes = useSelector((state) => state.theme.themes);
    const formats = useSelector((state) => state.format.formats);

    const [content, setContent] = useState('');
    const [filter, setFilter] = useState({
        format: event ? event.format_id : null,
        theme: event ? event.theme_id : null,
    });

    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [commentToDeleteIndex, setCommentToDeleteIndex] = useState(null);
    const [updatedContent, setUpdatedContent] = useState('');
    const [commentToUpdateIndex, setCommentToUpdateIndex] = useState(null);

    const handleOpenPaymentModal = () => setShowPaymentModal(true);
    const handleClosePaymentModal = () => setShowPaymentModal(false);

    const handleInputChatChange = (event) => {
        setContent(event.target.value);
    };

    const handleDelete = (index) => {
        setCommentToDeleteIndex(index);
        setShowModal(true);
    };

    const confirmDelete = () => {
        setShowModal(false);
        const commentId = comments[commentToDeleteIndex].id;
        dispatch(deleteComment(commentId));
    };

    const handleUpdateContentChange = (event) => {
        setUpdatedContent(event.target.value);
    };

    const handleUpdate = (index) => {
        setCommentToUpdateIndex(index);
        const commentContent = comments[index].content;
        setUpdatedContent(commentContent);
    };

    const handleUpdateComment = () => {
        const commentId = comments[commentToUpdateIndex].id;
        dispatch(updateComment(commentId, updatedContent));
        setUpdatedContent('');
        setCommentToUpdateIndex(null);
    };

    useEffect(() => {
        dispatch(getEvent(eventId));
        dispatch(getComments(eventId));
        dispatch(getCommentsUsers(eventId, 1));
        dispatch(getEventGuests(eventId));
    }, [dispatch, eventId]);

    useEffect(() => {
        if (
            event &&
            (filter.format !== event.format_id ||
                filter.theme !== event.theme_id)
        ) {
            setFilter({
                format: event.format_id,
                theme: event.theme_id,
            });
        }
    }, [event, filter]);

    const handleSubmitComment = () => {
        if (user) {
            dispatch(createComment(content, user.id, event.id));
        }
        setContent('');
    };
    if (!event || parseInt(event.id) !== parseInt(eventId)) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <Footer />
            <Container>
                <Row className="d-flex">
                    <Col md={6} className="align-items-center">
                        <Card className={`${styles.card}`}>
                            <Card.Img
                                variant="top"
                                src={`http://127.0.0.1:8000/${event.picture}`}
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
                                            {getFormat(
                                                event.format_id,
                                                formats,
                                            )}
                                        </span>
                                    </div>
                                    <div className={styles.info}>
                                        <span className={styles.infoText}>
                                            Theme:{' '}
                                            {getTheme(event.theme_id, themes)}
                                        </span>
                                    </div>
                                    <div className={styles.info}>
                                        <span className={styles.infoText}>
                                            Tickets Available:{' '}
                                            {event.tickets_available}
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
                                    <div className={styles.info}>
                                        <MapWithAddress
                                            lat={parseFloat(event.latitude)}
                                            lng={parseFloat(event.longitude)}
                                        />
                                    </div>
                                </div>
                                <EventGuestsModal event_guests={event_guests} />
                                <div className="text-center">
                                    <Button
                                        variant="primary"
                                        className={`mt-2 ${styles.buyButton} w-100`}
                                        onClick={handleOpenPaymentModal}
                                    >
                                        Buy Ticket
                                    </Button>
                                </div>
                                <PaymentModal
                                    show={showPaymentModal}
                                    handleClose={handleClosePaymentModal}
                                    event={event}
                                />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} className=" align-items-center ">
                        <div>
                            <Card
                                className={`${styles.chat}  bg-dark text-light `}
                            >
                                <Card.Body>
                                    <Card.Title
                                        className={`text-light mb-4 ${styles.chatTitle}`}
                                    >
                                        Discussion
                                    </Card.Title>
                                    <div
                                        className={`${styles.commentsContainer} mb-3`}
                                    >
                                        {comments &&
                                            Array.isArray(comments) &&
                                            comments.map((comment, index) => {
                                                const author =
                                                    users &&
                                                    users.find(
                                                        (user) =>
                                                            user.id ===
                                                            comment.user_id,
                                                    );
                                                return (
                                                    <div
                                                        className={`align-items-center mb-3`}
                                                        key={index}
                                                    >
                                                        <img
                                                            src={`http://127.0.0.1:8000/${author && author.picture}`}
                                                            alt={`User ${index + 1} Avatar`}
                                                            className={`${styles.avatar} mr-3`}
                                                        />
                                                        <div>
                                                            <strong
                                                                className={`${styles.username} `}
                                                            >
                                                                {author &&
                                                                    author.login}
                                                            </strong>
                                                            <div
                                                                className={`${styles.comment} mb-2`}
                                                            >
                                                                {commentToUpdateIndex ===
                                                                index ? (
                                                                    <div>
                                                                        <textarea
                                                                            value={
                                                                                updatedContent
                                                                            }
                                                                            onChange={
                                                                                handleUpdateContentChange
                                                                            }
                                                                            className="form-control mb-2"
                                                                            rows={
                                                                                3
                                                                            }
                                                                        />
                                                                        <div className="d-flex justify-content-end mt-auto">
                                                                            <button
                                                                                className="btn btn-sm btn-custom-primary mr-1"
                                                                                onClick={
                                                                                    handleUpdateComment
                                                                                }
                                                                            >
                                                                                Save
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        {
                                                                            comment.content
                                                                        }
                                                                        {user &&
                                                                            author &&
                                                                            user.id ===
                                                                                author.id && (
                                                                                <div className="d-flex justify-content-end mt-auto">
                                                                                    <button
                                                                                        className="btn btn-sm btn-custom-primary mr-1"
                                                                                        onClick={() =>
                                                                                            handleUpdate(
                                                                                                index,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Update
                                                                                    </button>
                                                                                    <button
                                                                                        className="btn btn-sm btn-custom-danger"
                                                                                        onClick={() =>
                                                                                            handleDelete(
                                                                                                index,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Delete
                                                                                    </button>
                                                                                </div>
                                                                            )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </Card.Body>

                                <Form className={styles.inputContainer}>
                                    <Form.Group>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            className={`${styles.input}`}
                                            value={content}
                                            onChange={handleInputChatChange}
                                        />
                                    </Form.Group>
                                    <div className={styles.buttonContainer}>
                                        <Button
                                            variant="primary"
                                            type="button"
                                            className={styles.button}
                                            onClick={handleSubmitComment}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div style={{ width: '100%', padding: 0, margin: 0 }}>
                <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
                    Similar Events
                </h2>
                <EventList
                    filter={filter}
                    excludeEvent={event.id}
                    eventsPerPage={3}
                />
            </div>
            <UniversalModal
                show={showModal}
                onHide={() => setShowModal(false)}
                title="Delete Comment"
                bodyText="Are you sure you want to delete this comment?"
                deleteActionText="Delete"
                handleDelete={confirmDelete}
                confirmationMessage="This action cannot be undone."
            />
        </div>
    );
};

export default EventPage;
