import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import SideBar from './SideBar';
import EventList from './EventList';

import { useDispatch } from 'react-redux';
import { getFormats } from '../store/actions/format';
import { getThemes } from '../store/actions/theme';
import { getEvents } from '../store/actions/events';
import { getCompanies } from '../store/actions/company';

import styles from '../styles/HomePage.module.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState({ format: '', theme: '' });
    const [sortByDate, setSortByDate] = useState('asc');

    useEffect(() => {
        dispatch(getFormats());
        dispatch(getThemes());
        dispatch(getEvents());
        dispatch(getCompanies());
    }, [dispatch]);

    const handleFilterChange = (format, theme) => {
        setFilter({ format, theme });
    };

    const handleSortChange = (sortByDate) => {
        setSortByDate(sortByDate);
    };

    return (
        <div>
            <Footer />
            <div className={styles.homePage}>
                <SideBar
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                />
                <EventList filter={filter} sortByDate={sortByDate} />
            </div>
        </div>
    );
};

export default HomePage;
