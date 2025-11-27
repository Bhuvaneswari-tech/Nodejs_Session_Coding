const router = require('express').Router();
const borrowController = require('../controllers/borrow.controller');
const auth = require('../middleware/auth');

router.post('/borrow', auth, borrowController.borrowBook);
router.put('/return/:id', auth, borrowController.returnBook);

module.exports = router;
