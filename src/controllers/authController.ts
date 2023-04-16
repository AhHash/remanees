import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import User from "../models/User";
import { RequestHandler } from "express";
import attachCookie from "../utils/attackCookie";

const registerUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && password && email)) {
    throw new BadRequestError("Please provide all values!");
  }

  const user: any = await User.create({ name, password, email });

  const token = user.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({ name: user.name, email: user.email });
};

const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!(password && email)) {
    throw new BadRequestError("Please provide all values!");
  }

  const user: any = await User.findOne({ email }).select("+password");

  if (!(user && (await user.comparePassword(password)))) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  user.password = undefined;

  const token = user.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({ user });
};

export { registerUser, loginUser };