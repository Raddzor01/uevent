import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import styles from '../styles/SideBar.module.css';

const SideBar = ({ onFilterChange, onSortChange }) => {
    const themes = useSelector((state) => state.theme.themes);
    const formats = useSelector((state) => state.format.formats);
    const [selectedFormat, setSelectedFormat] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('');
    const [sortByDate, setSortByDate] = useState('asc');

    if (!formats || !themes) {
        return <div>loading</div>;
    }

    const handleFilterChange = (event) => {
        const { value } = event.target;
        if (value) {
            if (value === 'AllFormat') {
                setSelectedFormat('');
                onFilterChange('', selectedTheme);
            } else if (value === 'AllTheme') {
                setSelectedTheme('');
                onFilterChange(selectedFormat, '');
            } else if (formats.some((format) => format.name === value)) {
                const formatId = formats.find(
                    (format) => format.name === value,
                ).id;
                setSelectedFormat(formatId);
                onFilterChange(formatId, selectedTheme);
            } else if (themes.some((theme) => theme.name === value)) {
                const themeId = themes.find((theme) => theme.name === value).id;
                setSelectedTheme(themeId);
                onFilterChange(selectedFormat, themeId);
            }
        }
    };

    const handleSortChange = (event) => {
        const { value } = event.target;
        setSortByDate(value);
        onSortChange(sortByDate);
    };

    return (
        <aside className={`p-4 ${styles.sidebar}`}>
            <h2>Filter and Sort</h2>
            <Form.Group className="mb-3">
                <Form.Label>Format:</Form.Label>
                <Form.Control as="select" onChange={handleFilterChange}>
                    <option value="AllFormat">All</option>
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
                    <option value="AllTheme">All</option>
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
                    <option value="desc">Newest first</option>
                    <option value="asc">Oldest first</option>
                </Form.Control>
            </Form.Group>
        </aside>
    );
};

export default SideBar;
