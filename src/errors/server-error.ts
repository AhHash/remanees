import CustomError from "./custom-api";
import { StatusCodes } from "http-status-codes";

class InternalServerError extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default InternalServerError;
