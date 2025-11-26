module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    fromDate: DataTypes.DATE,
    toDate: DataTypes.DATE,
    status: { type: DataTypes.STRING, defaultValue: 'PENDING' }
  });

  Leave.associate = (models) => {
    Leave.belongsTo(models.Employee, { foreignKey: 'employeeId' });
  };

  return Leave;
};
