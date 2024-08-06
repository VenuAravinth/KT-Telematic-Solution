'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class return_asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      return_asset.belongsTo(models.employee, {
        foreignKey: 'employee_id',
        onDelete: 'CASCADE'
      });
      
      return_asset.belongsTo(models.asset, {
        foreignKey: 'asset_id',
        onDelete: 'CASCADE'
      });
    }
  }
  return_asset.init({
    employee_id: DataTypes.INTEGER,
    asset_id: DataTypes.INTEGER,
    return_date: DataTypes.DATE,
    return_reason: DataTypes.TEXT,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'return_asset',
  });
  return return_asset;
};