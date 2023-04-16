// packages
import dotenv from "dotenv";
dotenv.config();
// import path from "path";

// express
import express from "express";
import "express-async-errors";
const server = express();

// imports
import connectDB from "./db/connect";
import { CustomError } from "./errors";

// routes
import authRouter from "./routers/authRouter";

// middleware
import errorHandler from "./middleware/error-handler";

// routes

server.use(express.json());

// server.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
// });

server.use("/api/v1/users", authRouter);

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
