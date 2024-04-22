import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Footer from './Footer';
import CompanyModal from './CompanyModal';
import { getUserCompanies } from '../store/actions/company';

import styles from '../styles/Profile.module.css';

const Profile = () => {
    const dispatch = useDispatch();
    const [selectedCompany, setSelectedCompany] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const companies = useSelector((state) => state.company.user_companies);

    const openCompanyModal = (company) => {
        setSelectedCompany(company);
    };

    const closeCompanyModal = () => {
        setSelectedCompany(null);
    };

    useEffect(() => {
        dispatch(getUserCompanies());
    }, [dispatch]);

    if (!user || !companies) {
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
                                            src={`https://www.rmpsrl.net/wp-content/uploads/2017/02/CP_logo_black-2.jpg`}
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
        </div>
    );
};

export default Profile;
