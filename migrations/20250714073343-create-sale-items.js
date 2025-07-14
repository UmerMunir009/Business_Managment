'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sale_items', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
      },
      sale_id:{
        type:Sequelize.UUID,
        allowNull:false,
        references: {
          model: "sales", //provide name of table present in database
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",

      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "products",//provide name of table present in database
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable('sale_items');
  }
};