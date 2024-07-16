import express from "express";
import { connectDb } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import authroutes from "./routes/authRoutes.js";
import profileroutes from "./routes/ProfileRoutes.js";
import TributeRoutes from "./routes/TributeRoutes.js";
import http from "http";
import { Server } from "socket.io";
import { setupSocket } from "./sockets.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use("/public/images", express.static("public/images"));

app.use(express.json());

// -----------------------------------------------Auth routes-------------------------------------------------
app.use("/api/auth/", authroutes);
// -----------------------------------------------profile routes------------------------------------------------
app.use("/api/Profile/", profileroutes);
// -----------------------------------------------tributes routes--------------------------------------------------
app.use("/api/tribute/", TributeRoutes);

// ------------------------------------------db connection--------------------------------------------

connectDb();

// ------------------------------------------Socket.io connection--------------------------------------------
setupSocket(io);

// ------------------------------------------running server--------------------------------------------

let prot = process.env.PORT || 4000;
server.listen(prot, () => {
  console.log(`server is running on port ${prot}`);
});
