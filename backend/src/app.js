import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import todoRoutes from "./routes/todo.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";

const app = express();

// ── Security & Logging ──────────────────────────────────────────────────────
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// ── CORS ────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({ status: "ok", message: "API is healthy 🟢" });
});


app.get("/api/v1/test", (req, res) => {
  const info = {
    message: "✅ Backend is reachable!",
    time: new Date().toISOString(),
    env: process.env.NODE_ENV || "not set",
    port: process.env.PORT || 4000,
    requestOrigin: req.headers.origin || "no origin header",
    requestHost: req.headers.host,
  };
  console.log("🧪 TEST ROUTE HIT:", info);
  res.status(200).json(info);
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/v1/todos", todoRoutes);

// ── Error Handlers ────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
