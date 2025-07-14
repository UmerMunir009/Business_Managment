'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        allowNull: false,
        primaryKey: true,
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
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",//provide name of table present in database
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      total_amount:{
         type:Sequelize.DECIMAL,
         allowNull:false,
         defaultValue:0
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
    await queryInterface.dropTable('sales');
  }
};