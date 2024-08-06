'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class issuse_asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      issuse_asset.belongsTo(models.asset, {
        foreignKey: 'asset_id',
        onDelete: 'CASCADE',
        as: 'emp'
      });

      issuse_asset.belongsTo(models.employee, {
        foreignKey: 'employee_id',
        onDelete: 'CASCADE'
      });
      
      issuse_asset.belongsTo(models.asset, {
        foreignKey: 'asset_id',
        onDelete: 'CASCADE'
      });
    }
  }
  issuse_asset.init({
    employee_id: DataTypes.INTEGER,
    asset_id: DataTypes.INTEGER,
    issuse_date: DataTypes.DATE,
    is_active: DataTypes.BOOLEAN,
    
  }, {
    sequelize,
    modelName: 'issuse_asset',
  });
  return issuse_asset;
};