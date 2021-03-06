'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Product, {
      foreignKey: 'catId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Category;
};