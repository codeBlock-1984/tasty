'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM(['IN_STOCK', 'OUT_OF_STOCK', 'RUNNING_LOW']),
      defaultValue: 'OUT_OF_STOCK'
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.Category, {
      foreignKey: 'catId',
      as: 'category',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Product.hasMany(models.OrderItem, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  
  return Product;
};