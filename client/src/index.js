import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LandingPage from './Pages/LandingPage.jsx';
import Footer from './Components/Footer.jsx';
import NavBar from './Components/NavBar.jsx';
import OurStaff from './Pages/OurStaff.jsx';
import PriceList from './Pages/PriceList.jsx';
import FeaturedCuts from './Pages/FeaturedCuts.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LandingPage />
    <OurStaff />
    <PriceList />
    <FeaturedCuts />
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
