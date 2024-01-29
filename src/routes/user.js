import express from "express";
import { body, validationResult } from "express-validator";

import { isAuth } from "../middlewares/jwt.js";
import { Login, logout, Signup, UserDelete } from "../controllers/auth.js";
import { User } from "../models/user.js";

export const UserRoutes = express.Router();

UserRoutes.post("/login", [body("id").trim(), body("password").trim().isLength({ min: 8 })], Login);

UserRoutes.put(
  "/signup",
  [
    body("id")
      .isEmail()
      .withMessage("Please enter a valid mail")
      .custom((value) => {
        return User.findById(value).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("아이디가 존재합니다");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 8 }),
    body("name").trim().not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
    }
    next();
  },
  Signup
);

UserRoutes.post("/logout", isAuth, logout);
UserRoutes.delete("/delete/:id", isAuth, UserDelete);
