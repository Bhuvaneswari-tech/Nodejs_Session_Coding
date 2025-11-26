module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: { type: DataTypes.STRING, allowNull: false },
    department: DataTypes.STRING
  });

  Employee.associate = (models) => {
    Employee.hasMany(models.Leave, { foreignKey: 'employeeId' });
  };

  return Employee;
};

//mapping
//Two table connectivity
//John employee is taking leave
//Emp101 is taking the leave
//Employee - employeeId , Leave - employeeId
//One employee can take multiple leaves -> one to many relationship