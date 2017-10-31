const path = require('path');

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  SECRET,
  API_EXTERNAL_URL,
} = process.env;

module.exports = {
  db: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
      freezeTableName: true,
      underscored: true,
    }
  },
  secret: SECRET,
  apiExternalURL: API_EXTERNAL_URL,
  uploadsPath: path.join(__dirname, '../../uploads')
};