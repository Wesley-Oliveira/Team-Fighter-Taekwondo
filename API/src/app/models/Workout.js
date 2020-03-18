import Sequelize, { Model } from 'sequelize';

class Workout extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: Sequelize.STRING,
        avaliacao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Student, {
      foreignKey: 'workout_id',
      through: 'studentsworkouts',
      as: 'students',
    });
  }
}

export default Workout;
