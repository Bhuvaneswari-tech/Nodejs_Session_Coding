// routes/patient.routes.js
const express = require('express');
const { createPatient, getPatientRecords, addVitals, uploadDiagnostic, deletePatient } = require('../controllers/patient.controller');
const verifyToken = require('../middleware/auth.middleware');
const authorizeRoles = require('../middleware/rbac.middleware');
const { uploadDiagnosticFile } = require('../middleware/upload.middleware');
const router = express.Router();

// All routes require a valid JWT token
router.use(verifyToken); 

// C: Create Patient (Doctor only)
router.post('/', authorizeRoles(['Doctor']), createPatient);

// R: Read Records (Role-filtered inside controller)
router.get('/', authorizeRoles(['Nurse', 'Doctor', 'Admin', 'SuperAdmin']), getPatientRecords);

// U: Add Vitals (Nurse/Doctor check inside controller)
router.put('/:id/vitals', authorizeRoles(['Nurse', 'Doctor']), addVitals);

// C/U: Upload Diagnostic File (Doctor only)
router.post('/:id/diagnostic', 
    authorizeRoles(['Doctor']), 
    uploadDiagnosticFile('diagnosticFile'), // Streaming upload middleware
    uploadDiagnostic
);

// D: Delete Patient (SuperAdmin only)
router.delete('/:id', authorizeRoles(['SuperAdmin']), deletePatient); 

module.exports = router;