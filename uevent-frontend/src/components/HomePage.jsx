import React from 'react';
import Footer from './Footer';
import SideBar from './SideBar';
import EventList from './EventList';

import styles from '../styles/HomePage.module.css';

const HomePage = () => {
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
