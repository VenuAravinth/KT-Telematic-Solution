'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      employee.hasMany(models.issuse_asset, {
        foreignKey: 'employee_id',
        onDelete: 'CASCADE',
        as: 'emp'
      });
    }
  }
  employee.init({
    employee_name: DataTypes.STRING,
    contact_no: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    employee_code: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'employee',
  });
  return employee;
};