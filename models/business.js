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
      Business.belongsTo(models.User, {foreignKey: "business_handler",as: "handler",});
      Business.hasMany(models.Category,{foreignKey:"business_id",as:"business_categories"})
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
      business_handler: {
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

