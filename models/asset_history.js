'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class asset_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      asset_history.belongsTo(models.asset, {
        foreignKey: 'asset_id',
        onDelete: 'CASCADE'
      });

      asset_history.belongsTo(models.employee, {
        foreignKey: 'employee_id',
        onDelete: 'CASCADE'
      });
      
      asset_history.belongsTo(models.events, {
        foreignKey: 'event_type_id',
        onDelete: 'CASCADE'
      });
    }
  }
  asset_history.init({
    event_type_id: DataTypes.INTEGER,
    asset_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    issue_date: DataTypes.DATE,
    notes: DataTypes.TEXT,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'asset_history',
  });
  return asset_history;
};