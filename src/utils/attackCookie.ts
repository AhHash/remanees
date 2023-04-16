import { Response } from "express";

const attachCookie = ({ res, token }: { res: Response; token: string }) => {
  res.cookie("token", token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};

export default attachCookie;
