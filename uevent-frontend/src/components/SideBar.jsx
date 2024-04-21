import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../styles/SideBar.module.css';

const SideBar = ({ onFilterChange, onSortChange }) => {
    const handleFilterChange = (event) => {
        // onFilterChange(event.target.value);
    };

    const handleSortChange = (event) => {
        // onSortChange(event.target.value);
    };

    return (
        <aside className={`p-4 ${styles.sidebar}`}>
            <h2>Filter and Sort</h2>
            <Form.Group className="mb-3">
                <Form.Label>Format:</Form.Label>
                <Form.Control as="select" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="conference">Conference</option>
                    <option value="lecture">Lecture</option>
                    <option value="workshop">Workshop</option>
                    <option value="fest">Festival</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Theme:</Form.Label>
                <Form.Control as="select" onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="business">Business</option>
                    <option value="politics">Politics</option>
                    <option value="psychology">Psychology</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Sort by Date:</Form.Label>
                <Form.Control as="select" onChange={handleSortChange}>
                    <option value="asc">Oldest first</option>
                    <option value="desc">Newest first</option>
                </Form.Control>
            </Form.Group>
            <Link to="/eventform">
                <Button variant="primary" className={styles.button}>
                    Create Event
                </Button>
            </Link>
        </aside>
    );
};

export default SideBar;
