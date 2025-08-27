import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Courses from './pages/Courses';
import Mentorship from './pages/Mentorship';
import Checkout from './pages/Checkout';
import MentorshipSuccess from './pages/MentorshipSuccess';
import CourseCheckout from './pages/CourseCheckout';
import CourseSuccess from './pages/CourseSuccess';
import SubscriptionSuccess from './pages/SubscriptionSuccess';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/checkout/:bookingId" element={<Checkout />} />
          <Route path="/course-checkout/:purchaseId" element={<CourseCheckout />} />
          <Route path="/course-success" element={<CourseSuccess />} />
          <Route path="/subscription-success" element={<SubscriptionSuccess />} />
          <Route path="/mentorship-success" element={<MentorshipSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
