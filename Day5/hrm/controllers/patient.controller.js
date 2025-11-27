// controllers/patient.controller.js
const Patient = require('../models/patient.model');
const { handleError } = require('../utils/error.util');
const fs = require('fs/promises'); // For file system cleanup
const path = require('path');

// --- C: Create Patient (Doctor only) ---
const createPatient = async (req, res) => {
    try {
        const { patientId, firstName, lastName } = req.body;
        
        // Doctor's ID is used as the assignedDoctor by default
        const newPatient = await Patient.create({
            patientId,
            firstName,
            lastName,
            assignedDoctor: req.user.id, // ID from the JWT payload
        });

        res.status(201).json({ success: true, message: 'Patient record created.', data: newPatient });
    } catch (err) {
        handleError(res, 400, 'Creation Failed', err.message);
    }
};

// --- R: Get Patient Records (Role-filtered) ---
const getPatientRecords = async (req, res) => {
    try {
        const role = req.user.role;
        let query = {};

        // RBAC Logic: Apply filtering based on role
        if (role === 'Doctor') {
            // Doctors can only see patients assigned to them
            query = { assignedDoctor: req.user.id };
        } else if (role === 'Nurse') {
            // Nurses can see all patients but will have restricted access on read/update
            query = {}; 
        } else if (role === 'Admin' || role === 'SuperAdmin') {
            // Admins/SuperAdmins see all records
            query = {};
        }

        const patients = await Patient.find(query).select('-diagnosticFiles -vitalsHistory'); // Exclude heavy/sensitive fields
        res.status(200).json({ success: true, count: patients.length, data: patients });
    } catch (err) {
        handleError(res, 500, 'Read Failed', err.message);
    }
};

// --- U: Add Vitals (Nurse/Doctor only) ---
const addVitals = async (req, res) => {
    try {
        const { temperature, bloodPressure, notes } = req.body;
        
        if (req.user.role !== 'Nurse' && req.user.role !== 'Doctor') {
             return handleError(res, 403, 'Forbidden', 'Only Nurses and Doctors can update vitals.');
        }

        const vitalEntry = {
            temperature,
            bloodPressure,
            notes,
            recordedBy: req.user.id
        };

        const patient = await Patient.findByIdAndUpdate(
            req.params.id,
            { $push: { vitalsHistory: vitalEntry } },
            { new: true, runValidators: true }
        ).select('+vitalsHistory');

        if (!patient) return handleError(res, 404, 'Not Found', 'Patient not found.');

        res.status(200).json({ success: true, message: 'Vitals added.', data: patient.vitalsHistory.pop() });
    } catch (err) {
        handleError(res, 400, 'Update Failed', err.message);
    }
};

// --- C/U: Upload Diagnostic File (Doctor only) ---
const uploadDiagnostic = async (req, res) => {
    try {
        if (!req.file) {
            return handleError(res, 400, 'Validation Error', 'Diagnostic file is required.');
        }
        
        const patientId = req.params.id;
        const fileUrl = `/uploads/diagnostics/${req.file.filename}`; // Local path

        const diagnosticEntry = {
            fileName: req.file.originalname,
            fileUrl: fileUrl,
            uploadedBy: req.user.id,
        };

        const patient = await Patient.findByIdAndUpdate(
            patientId,
            { $push: { diagnosticFiles: diagnosticEntry } },
            { new: true }
        );
        
        if (!patient) {
            // If patient not found, clean up the file that Multer saved
            await fs.unlink(req.file.path).catch(e => console.error("Cleanup failed:", e));
            return handleError(res, 404, 'Not Found', 'Patient not found.');
        }

        res.status(200).json({ success: true, message: 'Diagnostic file uploaded and linked.', file: diagnosticEntry });

    } catch (err) {
        // General error cleanup
        if (req.file && req.file.path) {
            await fs.unlink(req.file.path).catch(e => console.error("Cleanup failed:", e));
        }
        handleError(res, 500, 'Upload Failed', err.message);
    }
};

// --- D: Archive/Delete Patient (SuperAdmin only) ---
const deletePatient = async (req, res) => {
    try {
        // **NOTE: The RBAC middleware handles the role check here.**

        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return handleError(res, 404, 'Delete Failed', 'Patient record not found.');
        }

        // Cleanup Diagnostic Files from local disk
        for (const file of patient.diagnosticFiles) {
             const filePath = path.join(__dirname, '..', file.fileUrl);
             // Use unlink to delete the physical file asynchronously
             await fs.unlink(filePath).catch(e => console.warn(`File cleanup warning: ${e.message}`));
        }

        res.status(200).json({ success: true, message: 'Patient record and associated files deleted.' });
    } catch (err) {
        handleError(res, 500, 'Delete Failed', err.message);
    }
};

module.exports = {
    createPatient,
    getPatientRecords,
    addVitals,
    uploadDiagnostic,
    deletePatient
};