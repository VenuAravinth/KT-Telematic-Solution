'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 return queryInterface.bulkInsert('asset_categories',[
  {
    asset_category_name : 'Laptop'
  },
  {
    asset_category_name : 'Mobile'
  },
 ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('asset_category_name',{},null)
  }
};
