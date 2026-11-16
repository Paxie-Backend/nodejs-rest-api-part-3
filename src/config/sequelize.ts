import { Sequelize } from "sequelize";

const requiredEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

const sequelize = new Sequelize({
  dialect: "mysql",
  host: requiredEnv("DB_HOST"),
  port: Number(process.env.DB_PORT ?? 3306),
  username: requiredEnv("DB_USER"),
  password: process.env.DB_PASSWORD ?? "",
  database: requiredEnv("DB_NAME"),
  logging: false,
});

export default sequelize;