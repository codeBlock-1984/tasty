'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories',
      [
        {
          name: 'Cakes'
        },
        {
          name: 'Pies'
        },
        {
          name: 'Buns'
        },
        {
          name: 'Pastries'
        }
      ]
    , {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
