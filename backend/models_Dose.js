import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Dose = sequelize.define("Dose", {
  scheduledAt: DataTypes.DATE,
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending"
  }
});
