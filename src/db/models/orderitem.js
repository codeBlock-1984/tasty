'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
        as: 'orderId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
        as: 'productId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {});
  OrderItem.associate = function(models) {
    // associations can be defined here
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    OrderItem.belongsTo(models.Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return OrderItem;
};