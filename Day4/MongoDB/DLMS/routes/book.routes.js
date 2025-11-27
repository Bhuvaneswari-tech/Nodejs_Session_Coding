const router = require('express').Router();
const bookController = require('../controllers/book.controller');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', auth, roles('admin','librarian'), upload.single('file'), bookController.addBook);
router.get('/', auth, bookController.getBooks);
router.get('/stream/:id', auth, bookController.streamBook);

module.exports = router;
