import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const handler: ErrorRequestHandler = (err, req, res, next) => {
  const text = err.text || "Something went wrong. Please try again later!";
  const code = err.code || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(code).json({
    msg: text,
  });
};

export default handler;
