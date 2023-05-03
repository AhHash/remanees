import { RequestHandler } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";

const checkAuthentication: RequestHandler = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid!");
  }

  try {
    const { id }: any = jwt.verify(token, process.env.JWT_SECRET as Secret);
    (req as any).user = { id };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid!");
  }
};

export default checkAuthentication;
