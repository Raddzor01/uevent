import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Footer.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../store/actions/auth';
import CreateCompanyForm from './CreateCompanyForm';

const Footer = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleLogout = () => dispatch(logout());

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
                    <Col xs={12} md={1} className={`text-center`}>
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
                        md={2}
                        className="text-center text-md-end mt-3 mt-md-0"
                    >
                        {user ? (
                            <div>
                                <Link
                                    to={`/profile/${user.id}`}
                                    className={`${styles.userInfo} text-end`}
                                >
                                    <p className={`${styles.text} mb-0`}>
                                        {user.login}
                                    </p>
                                </Link>
                                <img
                                    src={`http://127.0.0.1:8000/${user.picture}`}
                                    alt={`${user.login}'s Avatar`}
                                    className={`${styles.avatar} ms-2`}
                                />
                                <Button
                                    variant="secondary"
                                    className={styles.button}
                                    size="sm"
                                    onClick={handleLogout}
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
