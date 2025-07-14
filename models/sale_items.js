'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sale_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sale_Item.belongsTo(models.Sales, {foreignKey: "sale_id",as: "sale",});
      Sale_Item.belongsTo(models.Product, {foreignKey: "product_id",as: "product",});
    }
  }
  Sale_Item.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      sale_id:{
        type:Sequelize.UUID,
        allowNull:false,

      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      price:{
         type:Sequelize.DECIMAL,
         allowNull:false,
      },
      quantity:{
         type:Sequelize.INTEGER,
         allowNull:false,
      },
      sub_total:{
         type:Sequelize.DECIMAL,
         allowNull:false,
      }
  }, {
    sequelize,
    modelName: 'Sale_Item',
    tableName:'sale_items'
  });
  return Sale_Item;
};