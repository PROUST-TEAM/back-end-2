import jwt from "jsonwebtoken";
import { status } from "../../config/response.status.js";
import { BaseError } from "../../config/error.js";

export const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    throw new BaseError(status.UNAUTHORIZED);
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    throw new BaseError(status.UNAUTHORIZED);
  }
  req.userId = decodedToken.userId;
  next();
};
