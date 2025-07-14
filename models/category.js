"use strict";
const { Model,Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Category.belongsTo(models.Business, {foreignKey: "business_id",as: "business",});
        Category.hasMany(models.Product,{foreignKey:"category_id",as:"category_products"})

    }
  }
  Category.init(
    {
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
      business_id:{
        type:DataTypes.UUID,
        allowNull:false
      }
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
    }
  );
  return Category;
};
