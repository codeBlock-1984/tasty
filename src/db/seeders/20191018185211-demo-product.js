'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Sponge Cake',
        description: 'The sponge cake is awesome',
        price: 1500,
        catId: 1,
        stock: 10
      },
      {
        name: 'Chocolate Souffle',
        description: 'Meet the amazing Souffle',
        price: 6000,
        catId: 4,
        stock: 10
      },
      {
        name: 'Almond Pie',
        description: 'This pie is off the charts',
        price: 3400,
        catId: 2,
        stock: 10
      },
      {
        name: 'Rock Bun',
        description: 'Prepare for your world to be rocked',
        price: 900,
        catId: 3,
        stock: 10
      },
      {
        name: 'Cup Cake',
        description: 'This cup is already full',
        price: 3100,
        catId: 1,
        stock: 10
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
