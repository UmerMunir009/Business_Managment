"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Business, {foreignKey: "created_by",as: "createdBusinesses",});
      User.hasMany(models.Business, {foreignKey: "owner",as: "handledBusinesses", });
      User.hasMany(models.Sales, {foreignKey: "user_id",as: "userSales", });
      User.hasMany(models.User_Role,{foreignKey:"user_id",as:"roles"})
    }
  }

  User.init(
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
    },
    {
      sequelize,
      modelName: "User",     
      tableName: "users",
    }
  );

  return User;
};
