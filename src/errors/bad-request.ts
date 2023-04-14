import CustomError from "./custom-api";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequestError;
