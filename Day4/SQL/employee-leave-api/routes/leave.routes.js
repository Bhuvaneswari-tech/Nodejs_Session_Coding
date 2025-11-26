const router = require('express').Router();
const controller = require('../controllers/leave.controller');
const jwtAuth = require('../middleware/jwtAuth');

router.post('/', controller.applyLeave);
router.put('/:id/approve', jwtAuth, controller.approveLeave);
router.put('/:id/reject', jwtAuth, controller.rejectLeave);
router.get('/', controller.searchLeaves);

module.exports = router;
