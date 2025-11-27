// models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false // Never return the password field in queries by default
    },
    role: {
        type: String,
        enum: ['Nurse', 'Doctor', 'Admin', 'SuperAdmin'],
        default: 'Nurse',
        required: true
    },
}, { timestamps: true });

// --- Mongoose Middleware (Pre-Save Hook) ---
// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
    // Only run if password was actually modified
    if (!this.isModified('password')) return next();
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// --- Instance Method ---
// Compare the provided password with the hashed password in the DB
userSchema.methods.comparePassword = async function (candidatePassword) {
    // 'select: false' requires explicitly selecting the password field first
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);