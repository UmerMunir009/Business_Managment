'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Role.belongsTo(models.User, {foreignKey: "user_id",as: "user",});
      User_Role.belongsTo(models.Business, {foreignKey: "business_id",as: "business",});
    }
  }
  User_Role.init({
     id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      business_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull:false
      }
  }, {
    sequelize,
    modelName: 'User_Role',
    tableName:"user_roles"
  });
  return User_Role;
};