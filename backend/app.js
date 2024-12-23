import express from "express";
import morgan from "morgan";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";

connectDB();
const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("Hello from Backend");
});


export default app;