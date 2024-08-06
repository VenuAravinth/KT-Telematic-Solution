'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('events',[
      {
        event_name : "Purchase"
      },
      {
        event_name : "Sales"
      },
      {
        event_name : "Return"
      },
    ] )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('events',{},null)
  }
};
