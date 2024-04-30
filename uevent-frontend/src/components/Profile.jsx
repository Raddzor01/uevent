import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import CompanyModal from './CompanyModal';
import { formatDate } from '../store/actions/data';
import { getUserCompanies } from '../store/actions/company';
import { getAllTicketEvents, updateUserPhoto } from '../store/actions/user';
import AddressDisplay from './AddressDisplay';
import UserUpdateForm from './UserUpdateForm';
import styles from '../styles/Profile.module.css';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const ticketEvents = useSelector((state) => state.user.ticket_events);
    const companies = useSelector((state) => state.company.user_companies);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);

    const handleAvatarChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('photo', file);
            await dispatch(updateUserPhoto(user.id, formData));
        }
    };

    const openCompanyModal = (company) => {
        setSelectedCompany(company);
    };

    const closeCompanyModal = () => {
        setSelectedCompany(null);
    };

    const handleCloseUpdateUserModal = () => {
        setShowUpdateUserModal(false);
    };

    const handleOpenUpdateUserModal = () => {
        setShowUpdateUserModal(true);
    };

    useEffect(() => {
        dispatch(getUserCompanies());
        dispatch(getAllTicketEvents(user.id));
    }, [dispatch, user]);

    if (!user || !companies || !ticketEvents) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Footer />
            <div className={`bg-dark text-light py-4 ${styles.container}`}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={6}>
                            <Card className={styles.card}>
                                <Card.Body>
                                    <div
                                        className={`text-center mb-3 ${styles.textCenter}`}
                                    >
                                        <label htmlFor="avatarInput">
                                            <img
                                                src={`http://127.0.0.1:8000/${user.picture}`}
                                                alt="Avatar"
                                                className={`rounded-circle ${styles.avatar}`}
                                            />
                                            <input
                                                id="avatarInput"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleAvatarChange}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>

                                    <Card.Title
                                        className={`text-center ${styles.cardTitle}`}
                                    >
                                        {user.login}
                                    </Card.Title>
                                    <Row className="justify-content-center">
                                        <Button
                                            variant="primary"
                                            className={styles.button}
                                            onClick={() =>
                                                handleOpenUpdateUserModal(
                                                    user.id,
                                                )
                                            }
                                        >
                                            Edit Profile
                                        </Button>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid className={styles.company_container}>
                <h2 className={styles.heading}>Companies</h2>
                <Row className="justify-content-center noGutters">
                    {companies.map((company) => (
                        <Col
                            sm={6}
                            md={4}
                            lg={3}
                            key={company.id}
                            className={styles.col}
                        >
                            <Card
                                className={`mb-4 ${styles.companyCard}`}
                                onClick={() => openCompanyModal(company)}
                            >
                                <Card.Body>
                                    <div className={styles.companyInfo}>
                                        <img
                                            src={`http://127.0.0.1:8000/${company.picture_path}`}
                                            alt="Company Logo"
                                            className={styles.companyLogo}
                                        />
                                        <div>
                                            <h5 className={styles.companyName}>
                                                {company.name}
                                            </h5>
                                            <p className={styles.companyEmail}>
                                                {company.email}
                                            </p>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <CompanyModal
                    company={selectedCompany}
                    show={!!selectedCompany}
                    handleClose={closeCompanyModal}
                />
            </Container>
            <Container fluid className={styles.eventContainer}>
                <h2 className={styles.heading}>Tickets</h2>
                <Row className="justify-content-center noGutters">
                    {ticketEvents &&
                        ticketEvents.map((event) => (
                            <Col
                                sm={6}
                                md={4}
                                lg={3}
                                key={event.id}
                                className={styles.col}
                            >
                                <Link
                                    to={`/event/${event.id}`}
                                    className={`text-decoration-none ${styles.link}`}
                                >
                                    <Card
                                        className={`mb-4 bg-dark ${styles.eventCard}`}
                                    >
                                        <Card.Body
                                            className={`text-white text-center ${styles.cardBody}`}
                                        >
                                            <h5 className={styles.eventName}>
                                                {event.name}
                                            </h5>
                                            <p
                                                className={`mb-1 ${styles.date}`}
                                            >
                                                {formatDate(event.date)}
                                            </p>
                                            <AddressDisplay
                                                lat={parseFloat(event.latitude)}
                                                lng={parseFloat(
                                                    event.longitude,
                                                )}
                                            />
                                            <label>
                                                <img
                                                    alt="event"
                                                    src={`http://127.0.0.1:8000/${event.picture}`}
                                                    className={`rounded-circle ${styles.event_avatar}`}
                                                />
                                            </label>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                </Row>
            </Container>
            <Modal
                show={showUpdateUserModal}
                onHide={handleCloseUpdateUserModal}
                centered
                className={`bg-dark `}
            >
                <Modal.Header
                    closeButton
                    className={`bg-dark ${styles.modalHeader}`}
                >
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`bg-dark ${styles.modalText}`}>
                    <UserUpdateForm
                        user={user}
                        handleClose={handleCloseUpdateUserModal}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Profile;
