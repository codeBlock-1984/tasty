'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Jane Doe',
        email: 'jane.doe@yahoo.com',
        phone: '09010000012',
        password: 'superpassword',
        role: 'SUPER'
      },
      {
        name: 'John Doe',
        email: 'john.doe@yahoo.com',
        phone: '09010000013',
        password: 'adminpassword',
        role: 'ADMIN'
      },
      {
        name: 'Jon Don',
        email: 'jon.don@yahoo.com',
        phone: '09010000014',
        password: 'password1',
        role: 'CUSTOMER'
      },
      {
        name: 'Henry Moe',
        email: 'henry.moe@yahoo.com',
        phone: '09010000015',
        password: 'password2',
        role: 'CUSTOMER'
      },
      {
        name: 'Kate Ray',
        email: 'kate.ray@yahoo.com',
        phone: '09010000016',
        password: 'password3',
        role: 'CUSTOMER'
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
