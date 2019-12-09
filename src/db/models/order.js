'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: {
      type: DataTypes.ENUM(['PENDING', 'CONFIRMED', 'CANCELED']),
      defaultValue: 'PENDING'
    }
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'customer',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Order;
};