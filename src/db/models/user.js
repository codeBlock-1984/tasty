'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(['CUSTOMER', 'ADMIN', 'SUPER']),
      defaultValue: 'CUSTOMER'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Order, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return User;
};