import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// import LoginForm from "./components/LoginForm";
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import EventPage from './components/EventPage';
import EventForm from './components/EventForm';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/event/:eventId" element={<EventPage />} />
                    <Route path="/eventform" element={<EventForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;