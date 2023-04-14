// packages
import dotenv from "dotenv";
dotenv.config();

// express
import express from "express";
const server = express();

// imports
import connectDB from "./db/connect";
import { CustomError } from "./errors";

// middleware
import errorHandler from "./middleware/error-handler";

// routes
server.get("*", (req, res) => {
  throw new CustomError("hello", 500);
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
