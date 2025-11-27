const express = require("express");
const router = express.Router();
let employees = [
{ id: 1, name: "Alice", salary: 50000 },
{ id: 2, name: "Bob", salary: 60000 }
];
// GET employees
router.get("/", (req, res) => res.json(employees));
// POST employee
router.post("/", (req, res) => {
const emp = { id: employees.length + 1, ...req.body };
employees.push(emp);
res.json(emp);
});
module.exports = router;