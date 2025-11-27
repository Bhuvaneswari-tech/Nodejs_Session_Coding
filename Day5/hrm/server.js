// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const User = require('./models/user.model'); // Ensure User model is loaded if needed globally

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middleware: Body parser to read JSON
app.use(express.json());

// --- Static File Serving ---
// Makes diagnostic files in 'uploads/diagnostics' accessible via '/uploads/diagnostics' URL prefix.
app.use('/uploads/diagnostics', express.static(path.join(__dirname, 'uploads', 'diagnostics')));

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);

// --- Root Route ---
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Secure HRM API!' });
});

// --- 404 Handler ---
app.use((req, res, next) => {
    res.status(404).json({ 
        success: false, 
        error: { 
            type: 'Not Found', 
            message: `Cannot find ${req.originalUrl} on this server.`
        }
    });
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌍 HRM Server running on port ${PORT}`));