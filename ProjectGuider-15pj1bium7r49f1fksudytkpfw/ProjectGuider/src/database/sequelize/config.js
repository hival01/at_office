/**
 * database/sequelize/config.js — Sequelize CLI Configuration
 *
 * This file is used ONLY by the Sequelize CLI (npx sequelize-cli ...).
 * It tells the CLI how to connect to your database for migrations and seeds.
 *
 * Referenced by .sequelizerc at the project root.
 * Runtime application code uses src/database/sequelize/connection.ts instead.
 *
 * Supports: PostgreSQL, MySQL, SQLite, MariaDB
 * Change "dialect" based on your database choice.
 */

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'project_guider_db',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: process.env.DB_DIALECT || 'postgres',  // postgres | mysql | sqlite | mariadb
    logging: console.log,
  },
  test: {
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME + '_test' || 'project_guider_db_test',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
