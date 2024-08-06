'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      branch.hasMany(models.asset, {
        foreignKey: 'branch_id',
        onDelete: 'CASCADE',
        as: 'emp'
      });
    }
  }
  branch.init({
    branch_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'branch',
  });
  return branch;
};