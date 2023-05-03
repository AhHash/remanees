import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const handler: ErrorRequestHandler = (err, req, res, next) => {
  let text = err.text || "Something went wrong. Please try again later!";
  let code = err.code || StatusCodes.INTERNAL_SERVER_ERROR;

  console.log(err);

  if (err.code === 11000) {
    text = "This email alreasy exists. Try logging in?";
    code = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "ValidationError") {
    text = `The following fiels are invalid: ${Object.keys(err.errors).join(
      " - "
    )}; ${Object.values(err.errors)
      .map((item: any) => item.message)
      .join(" - ")}`;
  }

  res.status(code).json({
    msg: text,
  });
};

export default handler;
