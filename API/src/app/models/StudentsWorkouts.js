import Sequelize, { Model } from 'sequelize';

class StudentWorkout extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        workout_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
    });
    this.belongsTo(models.Workout, {
      foreignKey: 'workout_id',
    });
  }
}

export default StudentWorkout;
