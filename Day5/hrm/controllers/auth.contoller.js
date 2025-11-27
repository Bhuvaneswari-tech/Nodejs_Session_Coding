// controllers/auth.controller.js
const User = require('../models/user.model'); // Assumed to have bcrypt implemented
const jwt = require('jsonwebtoken');
const { handleError } = require('../utils/error.util');

// Helper to generate a JWT token
const createToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role }, // Payload MUST include ROLE for RBAC middleware
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// 1. Register User (Signup)
const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        if (!username || !email || !password) {
            return handleError(res, 400, 'Validation Error', 'Missing required fields.');
        }

        // Only allow roles that exist in the schema, defaulting to 'Nurse'
        const allowedRoles = ['Nurse', 'Doctor', 'Admin', 'SuperAdmin'];
        const userRole = (role && allowedRoles.includes(role)) ? role : 'Nurse';

        const user = await User.create({ username, email, password, role: userRole });
        
        const token = createToken(user);
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            token: token,
            user: { id: user._id, username: user.username, role: user.role }
        });

    } catch (err) {
        if (err.code === 11000) {
            return handleError(res, 409, 'Conflict', 'User with this email or username already exists.');
        }
        handleError(res, 500, 'Internal Server Error', err.message);
    }
};

// 2. Login User
// controllers/auth.controller.js

// ... (register function remains the same) ...

// 2. Login User
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return handleError(res, 400, 'Validation Error', 'Please provide email and password.');
        }

        // Correctly retrieving the user and the hashed password
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) { 
            return handleError(res, 401, 'Unauthorized', 'Invalid credentials.');
        }

        const token = createToken(user);

        res.status(200).json({
            success: true,
            message: 'Logged in successfully.',
            token: token,
            user: { id: user._id, username: user.username, role: user.role }
        });

    } catch (err) {
        // IMPROVEMENT: Pass the error object 'err' for better server-side logging
        handleError(res, 500, 'Internal Server Error', err.message); 
    }
};


module.exports = { register, login };


module.exports = { register, login };