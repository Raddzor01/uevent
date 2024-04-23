import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent } from '../store/actions/events';
import styles from '../styles/CompanyUpdateForm.module.css';

const EventUpdateForm = ({ event, handleClose }) => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.company.companies);
    const formats = useSelector((state) => state.format.formats);
    const themes = useSelector((state) => state.theme.themes);
    const initialDateTime = event.date ? event.date.slice(0, 16) : '';
    const [originalFormData] = useState({
        name: event.name,
        description: event.description,
        date: initialDateTime,
        price: event.price,
        tickets_available: event.tickets_available,
        latitude: event.latitude,
        longitude: event.longitude,
        company_id: event.company_id,
        format_id: event.format_id,
        theme_id: event.theme_id,
    });

    const [formData, setFormData] = useState({
        name: event.name,
        description: event.description,
        date: initialDateTime,
        price: event.price,
        tickets_available: event.tickets_available,
        latitude: event.latitude,
        longitude: event.longitude,
        company_id: event.company_id,
        format_id: event.format_id,
        theme_id: event.theme_id,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const changedFields = {};
        for (const key in formData) {
            if (formData[key] !== originalFormData[key]) {
                changedFields[key] = formData[key];
            }
        }

        if (Object.keys(changedFields).length > 0) {
            dispatch(updateEvent(event.id, changedFields));
        }

        handleClose();
        window.location.reload();
    };

    return (
        <Modal.Body className={`bg-dark text-white ${styles.modalContent}`}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <Form.Group
                    controlId="formEventName"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Event Name
                    </Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formEventDescription"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Description
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formEventDate"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Date
                    </Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formEventPrice"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Price
                    </Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formEventTicketsAvailable"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Tickets Available
                    </Form.Label>
                    <Form.Control
                        type="number"
                        name="tickets_available"
                        value={formData.tickets_available}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formEventLatitude"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Latitude
                    </Form.Label>
                    <Form.Control
                        type="number"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formEventLongitude"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Longitude
                    </Form.Label>
                    <Form.Control
                        type="number"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formEventCompanyId"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Company
                    </Form.Label>
                    <Form.Control
                        as="select"
                        name="company_id"
                        value={formData.company_id}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    >
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group
                    controlId="formEventFormatId"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Format
                    </Form.Label>
                    <Form.Control
                        as="select"
                        name="format_id"
                        value={formData.format_id}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    >
                        {formats.map((format) => (
                            <option key={format.id} value={format.id}>
                                {format.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group
                    controlId="formEventThemeId"
                    className={styles.formGroup}
                >
                    <Form.Label className={`${styles.formLabel} mt-4`}>
                        Theme
                    </Form.Label>
                    <Form.Control
                        as="select"
                        name="theme_id"
                        value={formData.theme_id}
                        onChange={handleChange}
                        className={`${styles.input} ${styles.formControl}`}
                    >
                        {themes.map((theme) => (
                            <option key={theme.id} value={theme.id}>
                                {theme.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className={`${styles.updateButton} mt-4`}
                >
                    Update
                </Button>
            </Form>
        </Modal.Body>
    );
};

export default EventUpdateForm;
