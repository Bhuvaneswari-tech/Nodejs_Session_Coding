// middleware/upload.middleware.js
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { handleError } = require('../utils/error.util');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Files are streamed to the local 'uploads/diagnostics' folder
        cb(null, path.join(__dirname, '..', 'uploads', 'diagnostics'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${uuidv4().substring(0, 8)}`;
        const fileExtension = path.extname(file.originalname);
        // e.g., diagnostic-1707031234-abcdefgh.jpg
        cb(null, `diagnostic-${uniqueSuffix}${fileExtension}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 500 // 500 MB max for large medical files
    }
});

const uploadDiagnosticFile = (fieldName = 'diagnosticFile') => {
    return (req, res, next) => {
        upload.single(fieldName)(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return handleError(res, 400, 'Upload Error', err.message);
            } else if (err) {
                return handleError(res, 400, 'Invalid File', err.message);
            }
            // File streamed successfully to disk
            next();
        });
    };
};

module.exports = { uploadDiagnosticFile };