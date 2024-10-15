const dotenv = require("dotenv");
const env = dotenv.config({ path: "../../../.env" }).parsed;

module.exports = {
  client: env.DB_DIALECT,
  connection: {
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    password: env.DB_PASSWORD,
    user: env.DB_USERNAME,
  },
  migrations: {
    tableName: "knex_migrations",
  },
  pool: {
    max: 10,
    min: 2,
  },
};
