import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js"
import path from "path";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of express
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middleware
if(process.env.NODE_ENV !== "production") app.use(cors({origin: "http://localhost:5173",}));
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.get("/", (req, res) => {
//     res.status(200).send("Welcome to ThinkBoard Backend!");
// });

if(process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    });
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on Port: ${PORT}`);
    });
});
