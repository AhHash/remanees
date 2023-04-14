import CustomError from "./custom-api";
import { StatusCodes } from "http-status-codes";

class NotFoundError extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;
