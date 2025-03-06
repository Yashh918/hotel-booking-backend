import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';
import listingRouter from './routes/listingRoutes.js';
import unitRouter from './routes/unitRoutes.js';

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
app.use("/api/listings", listingRouter)
app.use("/api/units", unitRouter)

// test route
app.get('/', (req, res) => {
    res.send("Hotel booking API is running...")
})

export default app;