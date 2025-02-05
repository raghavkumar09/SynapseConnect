import "dotenv/config.js";
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import projectModal from "./models/project.model.js";
import { generateResult } from "./services/gemini.service.js";

const port = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(" ")[1];
        if (!token) {
            return next(new Error("Authentication error"));
        }

        const projectId = socket.handshake.query.projectId;
        if (!projectId) {
            return next(new Error("Authentication error"));
        }

        socket.project = await projectModal.findById(projectId);

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return next(new Error("Authentication error"));
        }

        socket.user = decodedToken;
        next();
    } catch (error) {
        next(error);
    }
})

io.on('connection', socket => {

    socket.roomId = socket.project._id.toString();

    console.log('a user connected');


    socket.join(socket.roomId);

    socket.on('project-message', async data => {
        const aiAvailable = data.message.includes('@ai' || '@AI');
        console.log("data", data);

        if (aiAvailable) {
            const prompt = data.message.replace('@ai', '').replace('@AI', '');
            const result = await generateResult(prompt);
            console.log("result", result);

            io.to(socket.roomId).emit('project-message', {
                message: result,
                sender: {
                    _id: "ai",
                    email: "AI"
                }
            });

            return;
        }

        socket.broadcast.to(socket.roomId).emit('project-message', data);
    })

    socket.on('event', data => {
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.leave(socket.roomId);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});