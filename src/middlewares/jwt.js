import jwt from "jsonwebtoken";

// export const isAuth = (req, res, next) => {
//   const authHeader = req.get("Authorization");
//   if (!authHeader) {
//     const error = new Error("권한 없음");
//     error.statusCode = 401;
//     throw error;
//   }
//   const token = req.get("Authorization").split(" ")[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     const error = new Error("권한 없음");
//     error.statusCode = 401;
//     throw error;
//   }
//   req.userId = decodedToken.userId;
//   next();
//
export const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    const error = new Error("권한 없음");
    error.statusCode = 401;
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("권한 없음");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};

