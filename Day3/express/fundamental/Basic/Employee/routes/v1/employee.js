// const express = require('express')
// const router = express.Router()
// const {v4: uuidv4} = require('uuid') //uuidv4 refers to uuid version 4

// const employees = require('../../data/employee.js')
// const auth = require('../../middleware/auth.js')

// const {employeeValidationRules, validate} = require('../../middleware/validateEmployee.js')

// //Get - list all employees
// router.get('/',(req,res)=>{
//     //query filter by department
//     const {department} = req.query
//     let result = employees
//     if(department) result = result.filter(e =>e.department.toLowerCase() === department.toLowerCase())
//     res.json(result)  
// })

// //Get - get employee by id
// router.get('/:id',(req,res,next)=>{
//     const emp = employees.find(e => e.id === req.params.id)
//     if(!emp){
//         const err = new Error('Employee not found')
//         err.status = 404
//         return next(err)
//     }
//     res.json(emp)
// })

// //POST - Create new employee
// router.post('/',auth,employeeValidationRules,validate,(req,res)=>{
//     const {name,department,role} = req.body
//     const newEmployee  = {
//         id: uuidv4(),
//         name,
//         department,
//         role:role || 'Staff'
//     }
//     employees.push(newEmployee)
//     res.cookie('lastCreated',newEmployee.id,{httpOnly:true,maxAge:3600000})
//     res.status(201).json({message:'Employee created', employee: newEmployee})
// })

// //PUT - update employee
// router.put("/:id",auth,employeeValidationRules,validate,(req,res,next)=>{
//     const emp = employees.find(e => e.id === req.params.id)
//     if(!emp){
//         const err = new Error('Employee not found')
//         err.status = 404
//         return next(err)
//     }
//     const {name,department,role} = req.body
//     emp.name = name
//     emp.department = department
//     emp.role = role || emp.role

//     res.json({message: 'Employee updated', employee: emp})
// })

// //DELETE - delete employee
// router.delete('/:id',auth,(req,res,next)=>{
//     const index = employees.findIndex(e => e.id === req.params.id)

//     if(index === -1){
//         const err = new Error('Employee not found')
//         err.status = 404
//         return next(err)
//     }

//     const removed = employees.splice(index,1)
//     res.json({message: 'Employee deleted', employee: removed[0]})
// })

// module.exports = router

const express = require('express')
const router = express.Router()
const {v4: uuidv4} = require('uuid') //uuidv4 refers to uuid version 4

const employees = require('../../data/employee.js')
const auth = require('../../middleware/auth.js')

const {employeeValidationRules, validate} = require('../../middleware/validateEmployee.js')
/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management API
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter employees by department
 *     responses:
 *       200:
 *         description: List of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get('/', (req, res) => {
  const { department } = req.query;
  let result = employees;
  if (department) {
    result = result.filter(e => e.department.toLowerCase() === department.toLowerCase());
  }
  res.json(result);
});

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
router.get('/:id', (req, res, next) => {
  const emp = employees.find(e => e.id === req.params.id);
  if (!emp) {
    const err = new Error('Employee not found');
    err.status = 404;
    return next(err);
  }
  res.json(emp);
});

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewEmployee'
 *     responses:
 *       201:
 *         description: Employee created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, employeeValidationRules, validate, (req, res) => {
  const { name, department, role } = req.body;
  const newEmployee = {
    id: uuidv4(),
    name,
    department,
    role: role || 'Staff',
  };
  employees.push(newEmployee);
  res.cookie('lastCreated', newEmployee.id, { httpOnly: true, maxAge: 3600000 });
  res.status(201).json({ message: 'Employee created', employee: newEmployee });
});

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewEmployee'
 *     responses:
 *       200:
 *         description: Employee updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', auth, employeeValidationRules, validate, (req, res, next) => {
  const emp = employees.find(e => e.id === req.params.id);
  if (!emp) {
    const err = new Error('Employee not found');
    err.status = 404;
    return next(err);
  }
  const { name, department, role } = req.body;
  emp.name = name;
  emp.department = department;
  emp.role = role || emp.role;

  res.json({ message: 'Employee updated', employee: emp });
});

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', auth, (req, res, next) => {
  const index = employees.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    const err = new Error('Employee not found');
    err.status = 404;
    return next(err);
  }
  const removed = employees.splice(index, 1);
  res.json({ message: 'Employee deleted', employee: removed[0] });
});

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: UUID of employee
 *         name:
 *           type: string
 *         department:
 *           type: string
 *         role:
 *           type: string
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         name: "John Doe"
 *         department: "Sales"
 *         role: "Manager"
 *     NewEmployee:
 *       type: object
 *       required:
 *         - name
 *         - department
 *       properties:
 *         name:
 *           type: string
 *         department:
 *           type: string
 *         role:
 *           type: string
 *       example:
 *         name: "Jane Smith"
 *         department: "Marketing"
 *         role: "Staff"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

module.exports = router