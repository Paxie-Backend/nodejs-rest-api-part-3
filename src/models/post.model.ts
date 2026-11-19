import { DataTypes, Model, type Optional } from "sequelize";

import sequelize from "../config/sequelize.js";
import User from "./user.model.js";

interface IPostAttributes {
  id: number;
  user_id: number;
  title: string;
  content: string | null;
  slug: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type TPostCreationAttributes = Optional<IPostAttributes, "id" | "createdAt" | "updatedAt">;

class Post extends Model<IPostAttributes, TPostCreationAttributes> implements IPostAttributes {
  declare id: number;
  declare user_id: number;
  declare title: string;
  declare slug: string | null;
  declare content: string | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "post",
    tableName: "posts",
    timestamps: true,
    underscored: true,
  }
);

// Define the relationship between Post and User.
Post.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

User.hasMany(Post, {
  foreignKey: "user_id",
  as: "posts",
});

export default Post;
