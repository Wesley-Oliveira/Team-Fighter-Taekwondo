import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        observacao: Sequelize.STRING,
        gub: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Workout, {
      foreignKey: 'student_id',
      through: 'studentsworkouts',
      as: 'workouts',
    });
  }
}

export default Student;
