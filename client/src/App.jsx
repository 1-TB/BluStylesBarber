import Layout from './Components/MSC/Layout';
import Contact from './Pages/Contact';
import About from './Pages/About';
import OurCuts from './Pages/OurCuts';
import LandingPage from './Pages/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import BookingPage from "./Pages/Booking";
import BookingConfirmation from "./Pages/Booking/Conformation";
import { AuthProvider } from "./Pages/CMS/AuthContext";
import CutsPage from './Pages/CMS/CutsPage';
import ContactRequests from './Pages/CMS/ContactRequests';
import Bookings from './Pages/CMS/Bookings';
import CMSLayout from './Components/MSC/CMSLayout';
import { ProtectedRoute } from './Pages/CMS/ProtectedRoute';
import CMSHome from './Pages/CMS/CMSHome';
import { AuthPage } from './Pages/CMS/AuthPage';
import { StaffProvider } from "./Pages/CMS/StaffProvider";
import StaffManagement from "./Pages/CMS/StaffManagement";

const App = () => {
  const [cuts, setCuts] = useState([]);

  useEffect(() => {
    const fetchCuts = async () => {
      try {
        const response = await fetch('/api/cuts');
        if (!response.ok) {
          throw new Error('Failed to fetch cuts');
        }
        const data = await response.json();
        setCuts(data);
        // Store cuts in localStorage for other components to use
        localStorage.setItem('cuts', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching cuts:', error);
      }
    };

    fetchCuts();
    
  
  }, []);

  return (
  <StaffProvider>
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/our-cuts" element={<OurCuts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route
              path="/booking-confirmation"
              element={<BookingConfirmation />}
            />
            <Route path="/login" element={<AuthPage />} />
          </Route>

          {/* CMS Routes */}
          <Route
            path="/cms"
            element={
              <ProtectedRoute requireAdmin>
                <CMSLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CMSHome />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="contacts" element={<ContactRequests />} />
            <Route path="cuts" element={<CutsPage />} />
            <Route path="staff" element={<StaffManagement />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </StaffProvider>
  );
};

export default App;
