'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Business.belongsTo(models.User, {foreignKey: "created_by",as: "creator",});
      Business.belongsTo(models.User, {foreignKey: "owner",as: "businessOwner",});
      Business.hasMany(models.Category,{foreignKey:"business_id",as:"business_categories"})
      Business.hasMany(models.Product,{foreignKey:"business_id",as:"business_products"})
      Business.hasMany(models.Sales,{foreignKey:"business_id",as:"business_sales"})
      Business.hasMany(models.User_Role,{foreignKey:"business_id",as:"business_roles"})
    }
  }
  Business.init({
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
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      owner: {
        type: DataTypes.UUID,
        allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Business',
    tableName:'businesses'
  });
  return Business;
};

