import CustomError from "./custom-api";
import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends CustomError {
  constructor(msg: string) {
    super(msg, StatusCodes.UNAUTHORIZED);
  }
}

export default UnauthenticatedError;
