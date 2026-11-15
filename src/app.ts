import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my TypeScript REST API! Its going to be fun InsyaAllah",
    data: null,
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", routes);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  res.status(500).json({
    message: "Internal server error",
    data: null,
  });
};

app.use(errorHandler);

export default app;
