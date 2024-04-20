import React, { useState } from 'react';
import styles from '../styles/Footer.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreateCompanyForm from './CreateCompanyForm';

const Footer = ({ login, user, logout }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // const user = {
    //     username: 'TestUser',
    //     avatarUrl: 'http://i.playground.ru/i/pix/863084/image.jpg',
    // };

    return (
        <footer className={`${styles.footer}`}>
            <Container fluid>
                <Row className="align-items-center justify-content-between">
                    <Col
                        xs={12}
                        md={3}
                        className="text-center text-md-start mb-3 mb-md-0"
                    >
                        <Link
                            to="/"
                            className={`${styles.logo} text-decoration-none`}
                        >
                            UEVENT
                        </Link>
                    </Col>
                    <Col xs={12} md={6} className="text-center">
                        <div
                            className={`${styles.advertisement} p-3 rounded shadow`}
                        >
                            <p className={`${styles.adText} mb-0`}>
                                Your advertisement could be here
                            </p>
                        </div>
                    </Col>
                    <Col xs={12} md={2} className={`text-center`}>
                        <div>
                            <Button
                                variant="info"
                                size="sm"
                                className={` ${styles.createCompany}`}
                                onClick={handleOpenModal}
                            >
                                Do you want to create a company?
                            </Button>
                        </div>
                        <CreateCompanyForm
                            show={showModal}
                            handleClose={handleCloseModal}
                        />
                    </Col>

                    <Col
                        xs={12}
                        md={1}
                        className="text-center text-md-end mt-3 mt-md-0"
                    >
                        {user ? (
                            <div className={`${styles.userInfo} text-end`}>
                                <p className={`${styles.text} mb-0`}>
                                    {user.username}
                                </p>
                                <img
                                    src={user.avatarUrl}
                                    alt={`${user.username}'s Avatar`}
                                    className={`${styles.avatar} ms-2`}
                                />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={logout}
                                >
                                    Log Out
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button
                                    variant="primary"
                                    className={styles.button}
                                    size="sm"
                                    onClick={login}
                                >
                                    Log In
                                </Button>
                            </Link>
                        )}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
