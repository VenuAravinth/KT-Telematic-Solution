'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      asset.belongsTo(models.asset_category, {
        foreignKey: 'asset_type_id',
        onDelete: 'CASCADE'
      });

      asset.hasMany(models.issuse_asset, {
        foreignKey: 'asset_id',
        as: 'issuse_asset'
      });

      asset.belongsTo(models.branch, {
        foreignKey: 'branch_id',
        onDelete: 'CASCADE'
      });
    }
  }
  asset.init({
    serial_no: DataTypes.STRING,
    asset_name: DataTypes.STRING,
    asset_type_id: DataTypes.INTEGER,
    make: DataTypes.STRING,
    modal: DataTypes.STRING,
    purchase_date: DataTypes.DATE,
    purchase_value: DataTypes.STRING,
    is_in_stock: DataTypes.BOOLEAN,
    branch_id: DataTypes.INTEGER,
    is_obsolete: DataTypes.BOOLEAN,
    obsolete_reason: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'asset',
  });
  return asset;
};