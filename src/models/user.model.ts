import { DataTypes, Model, type Optional } from "sequelize";

import sequelize from "../config/sequelize.js";

interface IUserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type TUserCreationAttributes = Optional<IUserAttributes, "id" | "createdAt" | "updatedAt">;

class User extends Model<IUserAttributes, TUserCreationAttributes> implements IUserAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

export default User;
