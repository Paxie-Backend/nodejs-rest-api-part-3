import "dotenv/config";

import app from "./app.js";
import sequelize from "./config/sequelize.js";

const PORT = process.env.SERVER_PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    // Verify the database connection
    await sequelize.authenticate();

    console.log("Database connected");

    // Start Express after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exitCode = 1;
  }
};

startServer();
