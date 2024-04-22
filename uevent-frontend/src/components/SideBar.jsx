import React from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import styles from '../styles/SideBar.module.css';

const SideBar = ({ onFilterChange, onSortChange }) => {
    const themes = useSelector((state) => state.theme.themes);
    const formats = useSelector((state) => state.format.formats);

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
                    {formats.map((format) => (
                        <option key={format.id} value={format.name}>
                            {format.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Theme:</Form.Label>
                <Form.Control as="select" onChange={handleFilterChange}>
                    <option value="">All</option>
                    {themes.map((theme) => (
                        <option key={theme.id} value={theme.name}>
                            {theme.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Sort by Date:</Form.Label>
                <Form.Control as="select" onChange={handleSortChange}>
                    <option value="asc">Oldest first</option>
                    <option value="desc">Newest first</option>
                </Form.Control>
            </Form.Group>
        </aside>
    );
};

export default SideBar;
