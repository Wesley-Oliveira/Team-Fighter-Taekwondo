import Sequelize, { Model } from 'sequelize';

class Workout extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: Sequelize.STRING,
        data: Sequelize.DATE,
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
      through: 'studentsworkouts',
      foreignKey: 'workout_id',
      as: 'students',
    });
  }
}

export default Workout;
