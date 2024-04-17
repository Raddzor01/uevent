import React from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import styles from "../styles/EventList.module.css";

const EventList = () => {
  const events = [
    {
      name: "Conference on Technology",
      description: "A conference discussing the latest trends in technology.",
      price: 50,
      previewPhoto:
        "https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg",
      organiser: "Tech Events Co.",
      date: "2024-05-15",
    },
    {
      name: "Conference on Technology",
      description: "A conference discussing the latest trends in technology.",
      price: 50,
      previewPhoto:
        "https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg",
      organiser: "Tech Events Co.",
      date: "2024-05-15",
    },
    {
      name: "Conference on Technology",
      description: "A conference discussing the latest trends in technology.",
      price: 50,
      previewPhoto:
        "https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg",
      organiser: "Tech Events Co.",
      date: "2024-05-15",
    },
    {
      name: "Conference on Technology",
      description: "A conference discussing the latest trends in technology.",
      price: 50,
      previewPhoto:
        "https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg",
      organiser: "Tech Events Co.",
      date: "2024-05-15",
    },
    {
      name: "Conference on Technology",
      description: "A conference discussing the latest trends in technology.",
      price: 50,
      previewPhoto:
        "https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg",
      organiser: "Tech Events Co.",
      date: "2024-05-15",
    },
    {
      name: "Music Festival",
      description: "A weekend full of live music performances.",
      price: 100,
      previewPhoto:
        "https://idfeurasia.com/static/c654db393b0fbf717e7154b1769507ae/screenshot_4.jpg",
      organiser: "Music Events LLC",
      date: "2024-06-20",
    },
  ];

  return (
    <Container fluid>
      <Row xs={1} md={2} lg={3}>
        {events.map((event, index) => (
          <Col key={index} className={styles.event}>
            <Card className={`bg-dark text-white`}>
              <Card.Img
                variant="top"
                src={event.previewPhoto}
                className={styles.image}
              />{" "}
              <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text className={styles.description}>
                  {event.description}
                </Card.Text>
                <p>Price: ${event.price}</p>
                <p>Organiser: {event.organiser}</p>
                <p>Date: {event.date}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventList;
