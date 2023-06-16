// packages
import dotenv from "dotenv";
import path from "path";
dotenv.config();
// import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

// express
import express from "express";
import "express-async-errors";
const server = express();

// imports
import connectDB from "./db/connect";

// routes
import authRouter from "./routers/authRouter";
import taskRouter from "./routers/taskRouter";

// middleware
import errorHandler from "./middleware/error-handler";
import checkAuthentication from "./middleware/checkAuthentication";
import morgan from "morgan";

server.use(morgan("dev"));
server.use(express.static(path.resolve(__dirname, "../client/dist")));

// routes
server.use(cors());
server.use(express.json());
server.use(cookieParser("%C&F)J@NcRfUjXn2r5u8x/A?D(G-KaPd"));

server.use("/api/v1/users", authRouter);
server.use("/api/v1/tasks", checkAuthentication, taskRouter);

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

server.use(errorHandler);

// server setup
const port = process.env.PORT || 4000;

server.listen(port, async () => {
  try {
    if (process.env.MONGO_CONNECTION_STRING) {
      await connectDB(process.env.MONGO_CONNECTION_STRING);
      console.log(`Server up and running at port ${port}`);
    }
  } catch (error) {
    console.log(error);
  }
});
