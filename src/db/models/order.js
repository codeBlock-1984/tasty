'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: {
      type: DataTypes.ENUM(['PENDING', 'CONFIRMED', 'CANCELED']),
      defaultValue: 'PENDING'
    },
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Order.belongsToMany(models.Product, {
      through: models.OrderItem
    });
  };
  return Order;
};