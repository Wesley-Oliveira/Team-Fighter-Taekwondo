import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';

// Variável para receber todos os models
const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Conexão do banco com os models
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();