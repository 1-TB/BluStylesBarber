# BluStyles

## Description
BluStyles is a web application designed for a barbershop, providing an intuitive interface for users to book appointments, view services, and manage their bookings. Built using Express.js for the backend and React for the frontend, BluStyles aims to enhance the customer experience by streamlining the booking process and providing essential information about services offered.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features
- **User-Friendly Interface:** Easy navigation for users to book appointments and view services.
- **Service Management:** Users can view detailed information about various haircuts and services.
- **Booking System:** Allows users to select services, choose dates and times, and confirm bookings.
- **Admin Dashboard:** Admins can manage bookings, clients, and services efficiently.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technologies Used
- **Frontend:**
  - React
  - React Router
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express
  - MongoDB
- **Others:**
  - Framer Motion for animations
  - Lucide React for icons
  - React DatePicker for date selection

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/1-TB/BluStylesBarber.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BluStylesBarber
   ```
3. Install the dependencies for both the client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `server` directory and add the necessary environment variables (e.g., MongoDB URI, email credentials).

## Usage
- To run the application locally, start the server and client:
   ```bash
   # In the server directory
   npm start
   ```
   ```bash
   # In the client directory
   npm start
   ```
- Access the application in your browser at `http://localhost:3000`.
