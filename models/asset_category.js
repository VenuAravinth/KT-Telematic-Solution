'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class asset_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      asset_category.hasMany(models.asset, {
        foreignKey: 'asset_type_id',
        onDelete: 'CASCADE',
        as: 'ac'
      });
    }
  }
  asset_category.init({
    asset_category_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'asset_category',
  });
  return asset_category;
};