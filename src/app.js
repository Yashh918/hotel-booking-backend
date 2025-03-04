import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// db connection
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error)
    }
}
connectToDatabase();

// routes
app.use("/api/auth", authRouter)

// test route
app.get('/', (req, res) => {
    res.send("Hotel booking API is running...")
})

export default app;