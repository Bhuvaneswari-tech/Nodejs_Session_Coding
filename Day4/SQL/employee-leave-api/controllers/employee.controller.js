const { Employee } = require('../models');

exports.createEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.create(req.body);
    res.status(201).json(emp);
  } catch (err) {
    next(err);
  }
};

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    next(err);
  }
};
