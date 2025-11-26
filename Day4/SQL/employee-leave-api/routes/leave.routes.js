// const router = require('express').Router();
// const controller = require('../controllers/leave.controller');
// const jwtAuth = require('../middleware/jwtAuth');

// router.post('/', controller.applyLeave);
// router.put('/:id/approve', jwtAuth, controller.approveLeave);
// router.put('/:id/reject', jwtAuth, controller.rejectLeave);
// router.get('/', controller.searchLeaves);

// module.exports = router;


const router = require('express').Router();
const controller = require('../controllers/leave.controller');
const jwtAuth = require('../middleware/jwtAuth');

/**
 * @swagger
 * tags:
 *   name: Leaves
 *   description: Leave management
 */

/**
 * @swagger
 * /leaves:
 *   post:
 *     summary: Apply for leave
 *     tags: [Leaves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - fromDate
 *               - toDate
 *             properties:
 *               employeeId:
 *                 type: integer
 *                 example: 1
 *               fromDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-01
 *               toDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-12-05
 *     responses:
 *       201:
 *         description: Leave applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 employeeId:
 *                   type: integer
 *                   example: 1
 *                 fromDate:
 *                   type: string
 *                   format: date
 *                   example: 2025-12-01
 *                 toDate:
 *                   type: string
 *                   format: date
 *                   example: 2025-12-05
 *                 status:
 *                   type: string
 *                   example: PENDING
 */

/**
 * @swagger
 * /leaves/{id}/approve:
 *   put:
 *     summary: Approve a leave (Manager only)
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Leave ID
 *     responses:
 *       200:
 *         description: Leave approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Leave approved
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /leaves/{id}/reject:
 *   put:
 *     summary: Reject a leave (Manager only)
 *     tags: [Leaves]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Leave ID
 *     responses:
 *       200:
 *         description: Leave rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Leave rejected
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /leaves:
 *   get:
 *     summary: Get all leaves (with optional status filter)
 *     tags: [Leaves]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *         description: Filter leaves by status
 *     responses:
 *       200:
 *         description: List of leaves
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   employeeId:
 *                     type: integer
 *                     example: 1
 *                   fromDate:
 *                     type: string
 *                     format: date
 *                     example: 2025-12-01
 *                   toDate:
 *                     type: string
 *                     format: date
 *                     example: 2025-12-05
 *                   status:
 *                     type: string
 *                     example: PENDING
 *                   Employee:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Alice
 *                       department:
 *                         type: string
 *                         example: HR
 */

router.post('/', controller.applyLeave);
router.put('/:id/approve', jwtAuth, controller.approveLeave);
router.put('/:id/reject', jwtAuth, controller.rejectLeave);
router.get('/', controller.searchLeaves);

module.exports = router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbmFnZXIiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTc2NDE1NzIyNCwiZXhwIjoxNzY0MTYwODI0fQ.JJ7lLFtK36FANJ1f5NTB_hq5Vo_haKPqdIEBn6nsB0U

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbmFnZXIiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTc2NDE1NzQyMCwiZXhwIjoxNzY0MTYxMDIwfQ.XmxHbMVNyPL5pExSEYMYG-cf0x3-ewaNN_PxZ_2gZVM