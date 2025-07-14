'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sales.belongsTo(models.Business, {foreignKey: "business_id",as: "business_sales",});
      Sales.belongsTo(models.User, {foreignKey: "user_id",as: "sales",});
      Sales.hasMany(models.Sale_Item,{foreignKey:"sale_id",as:"items"})
    }
  }
  Sales.init({
     id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      business_id:{
        type:Sequelize.UUID,
        allowNull:false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      total_amount:{
         type:Sequelize.DECIMAL,
         allowNull:false,
         defaultValue:0
      }
  }, {
    sequelize,
    modelName: 'Sales',
    tableName:'sales'
  });
  return Sales;
};