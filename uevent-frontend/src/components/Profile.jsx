import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from '../store/actions/user';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Footer from './Footer';
import styles from '../styles/Profile.module.css';

const Profile = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchUserProfile(dispatch, id);
            setUser(userData);
        };

        fetchData();
    }, [dispatch, id]);

    if (!user) {
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
                                        <img
                                            src={`https://i.kym-cdn.com/photos/images/original/001/265/762/87f.jpg`}
                                            alt="Avatar"
                                            className={`rounded-circle ${styles.avatar}`}
                                        />
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
        </div>
    );
};

export default Profile;
