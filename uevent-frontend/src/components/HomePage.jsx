import React, { useEffect } from 'react';
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
    useEffect(() => {
        dispatch(getFormats());
        dispatch(getThemes());
        dispatch(getEvents());
        dispatch(getCompanies());
    }, [dispatch]);
    return (
        <div>
            <Footer />
            <div className={styles.homePage}>
                <SideBar />
                <EventList />
            </div>
        </div>
    );
};

export default HomePage;
