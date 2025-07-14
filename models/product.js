'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Product.belongsTo(models.Business, {foreignKey: "business_id",as: "business"});
       Product.belongsTo(models.Category, {foreignKey: "category_id",as: "category"});
       Product.hasMany(models.Sale_Item, {foreignKey: 'product_id',as: 'sale_items'});


    }
  }
  Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      business_id:{
        type:DataTypes.UUID,
        allowNull:false
      },
      category_id:{
        type:DataTypes.UUID,
        allowNull:false
      }
  }, {
    sequelize,
    modelName: 'Product',
    tableName:'products'
  });
  return Product;
};