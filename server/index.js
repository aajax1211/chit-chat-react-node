import express from "express"
import dontenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"


dontenv.config();

const app = express();
const port = process.env.PORT || 4001;
const databaseURL = process.env.DATABASE_URL;

mongoose.connect(databaseURL).then(()=>{
    console.log("DB connection Successful")
}).catch(err=>{
    console.log(err.message)
})

app.use(cors({
    origin:[process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error('Error starting the server:', err);
});