module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('studentsworkouts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // students hasMany workouts n:n
          model: 'students',
          key: 'id',
        },
      },
      workout_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // workouts hasMany students n:n
          model: 'workouts',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('studentsworkouts');
  },
};
