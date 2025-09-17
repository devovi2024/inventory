import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import route from "./src/routes/api.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xssClean());
app.use(mongoSanitize());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("DB connection error:", err));

// Routes
app.use("/api/v1", route);

// 404 handler
app.all("*", (req, res) => {
  res.status(404).json({ status: "fail", message: "Route not found" });
});

export default app;
