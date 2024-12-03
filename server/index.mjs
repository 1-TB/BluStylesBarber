import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import clientRoutes from "./routes/clientRoutes.mjs";
import bookingRoutes from "./routes/bookingRoutes.mjs";
import contactRoutes from "./routes/contactRoutes.mjs";
import authRoutes from './routes/authRoutes.mjs';
import cutsRoutes from './routes/cutsRoutes.mjs';
import staffRoutes from './routes/staffRoutes.mjs'
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json({ limit: '50mb' })); // Increased payload limit for base64 images

/* ROUTES */
app.use(authRoutes);
app.use(clientRoutes);
app.use(bookingRoutes);
app.use(contactRoutes);
app.use(cutsRoutes);
app.use(staffRoutes);

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