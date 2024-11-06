/*
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import OurCuts from './Pages/OurCuts';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Layout from './Components/MSC/Layout';
import BookingPage from "./Pages/Booking";
import BookingConfirmation from "./Pages/Booking/Conformation";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="/our-cuts" element={<OurCuts />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
*/

// FOR TESTING THE CMS!!!!
import React from 'react';
import CMSHome from './Pages/CMS/CMSHome';

const App = () => {
  return (
    <div>
      <CMSHome />
    </div>
  );
};

export default App;