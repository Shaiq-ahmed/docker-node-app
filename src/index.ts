import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes";
import morgan from "morgan";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9191;
const MONGO_URI = process.env.MONGO_URI;
console.info("mongo :" + MONGO_URI)
if (!MONGO_URI) {
    console.error('MONGO_URI environment variable is not defined.');
    process.exit(1); 
}

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err: Error) => {
        console.error('MongoDB Connection Error: ', err);
        process.exit(1); 
    });

app.use(morgan('tiny'))    
app.use("/tasks", taskRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
