const { Leave, Employee, sequelize } = require('../models');

exports.applyLeave = async (req, res, next) => {
  try {
    const { employeeId, fromDate, toDate } = req.body;
    if (!employeeId || !fromDate || !toDate) {
      return res.status(400).json({ error: 'employeeId, fromDate and toDate are required' });
    }

    const employee = await Employee.findByPk(employeeId);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    const leave = await Leave.create({ employeeId, fromDate, toDate });
    res.status(201).json(leave);
  } catch (err) {
    next(err);
  }
};

exports.approveLeave = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const leave = await Leave.findByPk(req.params.id, { transaction: t });
    if (!leave) {
      await t.rollback();
      return res.status(404).json({ error: 'Leave not found' });
    }
    leave.status = 'APPROVED';
    await leave.save({ transaction: t });
    await t.commit();
    res.json({ message: 'Leave approved' });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.rejectLeave = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const leave = await Leave.findByPk(req.params.id, { transaction: t });
    if (!leave) {
      await t.rollback();
      return res.status(404).json({ error: 'Leave not found' });
    }
    leave.status = 'REJECTED';
    await leave.save({ transaction: t });
    await t.commit();
    res.json({ message: 'Leave rejected' });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

exports.searchLeaves = async (req, res, next) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;
    const leaves = await Leave.findAll({
      where,
      include: [{ model: Employee, attributes: ['id', 'name', 'department'] }]
    });
    res.json(leaves);
  } catch (err) {
    next(err);
  }
};
