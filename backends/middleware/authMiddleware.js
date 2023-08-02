import jwt from "jsonwebtoken";
import { createError } from "./createError.js";

export const authanticate = async (req, res, next) => {
    const token = req.cookies.tokenName
    if(!token) createError(400, "There is no token")
    try {
      jwt.verify(token, process.env.JWTSECRETKEY, (err, user) => {
        if(err) createError(401, "invalid token")
        req.id = user._id;
      })
      next()
  } catch (err) {
    next(err)
  }
};
