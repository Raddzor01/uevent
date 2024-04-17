import React from "react";
import styles from "../styles/Footer.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const Footer = ({ login, logout }) => {
  const user = {
    username: "TestUser",
    avatarUrl: "http://i.playground.ru/i/pix/863084/image.jpg",
  };

  return (
    <footer className={`${styles.footer}`}>
      <Container fluid>
        <Row className="align-items-center justify-content-between">
          <Col
            xs={12}
            md={3}
            className="text-center text-md-start mb-3 mb-md-0"
          >
            <p className={`${styles.logo} mb-0`}>UEVENT</p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <div className={`${styles.advertisement} p-3 rounded shadow`}>
              <p className={`${styles.adText} mb-0`}>
                Your advertisement could be here
              </p>
            </div>
          </Col>
          <Col xs={12} md={3} className="text-center text-md-end mt-3 mt-md-0">
            {user ? (
              <div className={`${styles.userInfo} text-end`}>
                <p className={`${styles.text} mb-0`}>{user.username}</p>
                <img
                  src={user.avatarUrl}
                  alt={`${user.username}'s Avatar`}
                  className={`${styles.avatar} ms-2`}
                />
                <Button variant="secondary" size="sm" onClick={logout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="sm" onClick={login}>
                Log In
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
