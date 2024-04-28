import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './store/actions/auth';
import Cookies from 'js-cookie';
import './App.css';

import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import EventPage from './components/EventPage';
import EventForm from './components/EventForm';
import PaymentStatus from './components/PaymentStatus';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!Cookies.get('token')) {
            dispatch(setUser(null));
        }
    }, [dispatch]);
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/event/:eventId" element={<EventPage />} />
                    <Route path="/eventform" element={<EventForm />} />
                    <Route path="/event/payment/" element={<PaymentStatus />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
