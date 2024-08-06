'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      asset_name: {
        type: Sequelize.STRING
      },
      serial_no: {
        type: Sequelize.STRING
      },
      asset_type_id: {
        type: Sequelize.INTEGER
      },
      make: {
        type: Sequelize.STRING
      },
      modal: {
        type: Sequelize.STRING
      },
      purchase_date: {
        type: Sequelize.DATE
      },
      purchase_value: {
        type: Sequelize.STRING
      },
      is_in_stock: {
        type: Sequelize.BOOLEAN
      },
      branch_id: {
        type: Sequelize.INTEGER
      },
      is_obsolete: {
        type: Sequelize.BOOLEAN
      },
      obsolete_reason: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('assets');
  }
};