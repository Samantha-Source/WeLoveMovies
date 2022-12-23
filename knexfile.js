const path = require("path");

require("dotenv").config();


// const {
//   DATABASE_URL = "postgresql://postgres@localhost/postgres",
// } = process.env;

const {
  DATABASE_URL = `postgres://tkqjagfv:L4nWDAeNsDAkLAl27xGIDRpmxYRe8-RK@isilo.db.elephantsql.com/tkqjagfv`, } = process.env;

const {
    DATABASE_URL = "postgres://tkqjagfv:L4nWDAeNsDAkLAl27xGIDRpmxYRe8-RK@isilo.db.elephantsql.com/tkqjagfv", 
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
