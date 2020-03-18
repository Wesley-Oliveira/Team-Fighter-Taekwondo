import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Student from '../app/models/Student';
import Workout from '../app/models/Workout';

// Variável para receber todos os models
const models = [User, Student, Workout];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão do banco com os models
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
