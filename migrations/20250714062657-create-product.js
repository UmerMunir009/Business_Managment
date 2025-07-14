'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
     id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
        
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false,

      },
      price: {
        type: Sequelize.INTEGER,
        allowNull:false,

      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull:false,

      },
      category_id:{
         type:Sequelize.UUID,
         allowNull:false,
         references: {
          model: "categories", //provide name of table present in database
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      business_id:{
        type:Sequelize.UUID,
        allowNull:false,
        references: {
          model: "businesses", //provide name of table present in database
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};