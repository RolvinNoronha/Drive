import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/AuthRoutes.js";

dotenv.config();
const app = express();
const Port = 5000;
const { MONGO_URL } = process.env;


mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser())

app.use("/", authRoutes);


app.listen(Port, () => {
    console.log(`Server listening on Port ${Port}`)
})