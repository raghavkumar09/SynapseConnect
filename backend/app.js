import express from "express";
import morgan from "morgan";
import userRouter from "./routes/user.route.js";
import projectRouter from "./routes/project.route.js";
import geminiRouter from "./routes/gemini.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/ai", geminiRouter);

app.get("/", (req, res) => {
    res.send("Hello from Backend");
});


export default app;