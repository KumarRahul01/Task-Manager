import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import connectDB from "./database/db.js";

// Load environment variables
configDotenv();

// importing routes
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";


const app = express();

// Configure CORS options
const corsOptions = {
  origin: ["https://task-manager-black-three.vercel.app/", "https://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
  exposedHeaders: ['Content-Length', 'X-Custom-Header'],
  credentials: true,
};

app.use(cors(corsOptions));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// Routes Middelwares
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server running successfully!" });
});

// connecting to database
connectDB(process.env.MONGODB_URI);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});