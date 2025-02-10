import express from "express"
import dontenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import path  from 'path';
import { contactRoutes } from "./routes/ContactRoutes.js"
import { setupSocket } from "./socket.js"
import { messagesRoutes } from "./routes/MessagesRoutes.js"


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

app.use('/uploads', express.static(path.resolve('uploads')));
app.use("/uploads/files", express.static("uploads/files"))

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/contacts", contactRoutes)
app.use("/api/messages", messagesRoutes)


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error('Error starting the server:', err);
});

setupSocket(server)