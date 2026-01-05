import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "medtracker",
  "postgres",
  "postgres",
  {
    host: "localhost",
    dialect: "postgres"
  }
);
