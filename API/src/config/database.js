module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin123',
  database: 'tftdb',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
