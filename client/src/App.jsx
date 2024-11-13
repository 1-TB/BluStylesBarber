import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import OurCuts from './Pages/OurCuts';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Layout from './Components/MSC/Layout';
import BookingPage from "./Pages/Booking";
import BookingConfirmation from "./Pages/Booking/Conformation";
import { AuthProvider } from "./Pages/CMS/AuthContext";
import { AuthPage } from './Pages/CMS/AuthPage';
import CMSHome from './Pages/CMS/CMSHome';
import { ProtectedRoute } from './Pages/CMS/ProtectedRoute';
import CMSLayout from './Components/MSC/CMSLayout';
import Bookings from './Pages/CMS/Bookings';
import ContactRequests from './Pages/CMS/ContactRequests';

const App = () => {
  return (
    <AuthProvider>
      <Router>
          <Routes>
              <Route element={<Layout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="/our-cuts" element={<OurCuts />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                  <Route path="/login" element={<AuthPage />} />
                  
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
                  </Route>
              </Route>
          </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
