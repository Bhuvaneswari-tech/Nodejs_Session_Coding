// models/patient.model.js
const mongoose = require('mongoose');

const diagnosticFileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true }, // Local path for file
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    uploadDate: { type: Date, default: Date.now },
});

const vitalSignSchema = new mongoose.Schema({
    temperature: { type: Number },
    bloodPressure: { type: String },
    notes: { type: String },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recordedAt: { type: Date, default: Date.now },
});

const patientSchema = new mongoose.Schema({
    patientId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    assignedDoctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'Patient must be assigned to a doctor.'] 
    },
    vitalsHistory: [vitalSignSchema], // Nested array for vitals
    diagnosticFiles: [diagnosticFileSchema], // Nested array for file metadata
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);