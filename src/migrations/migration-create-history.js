// 'use strict';
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     // patientId: DataTypes.INTEGER,
//     // doctorId: DataTypes.INTEGER,
//     // description: DataTypes.TEXT
//     await queryInterface.createTable('histories', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       patientId: {
//         type: Sequelize.INTEGER
//       },
//       description: {
//         type: Sequelize.TEXT
//       },
//       files: {
//         type: Sequelize.TEXT
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('histories');
//   }
// };

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // patientId: DataTypes.INTEGER,
    // doctorId: DataTypes.INTEGER,
    // description: DataTypes.TEXT
    await queryInterface.createTable('histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      files: {
        type: Sequelize.TEXT
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('histories');
  }
};