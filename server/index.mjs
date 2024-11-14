import express from "express";
import path from "path";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import clientRoutes from "./routes/clientRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import contactRoutes from "./routes/contactRoutes";
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());

/* ROUTES */
app.use(authRoutes);
app.use(clientRoutes);
app.use(bookingRoutes);
app.use(contactRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Catch-all handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});