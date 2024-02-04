import express from "express";
import { isAuth } from "../middlewares/jwt.js";
import { Login, logout, Signup, UserDelete, myPage, InfoEdit,findPW, googleLogin, kakaoLogin, naverLogin } from "../controllers/auth.js";
import asyncHandler from 'express-async-handler';

export const UserRoutes = express.Router();

UserRoutes.post("/login", asyncHandler(Login));
UserRoutes.post("/signup",asyncHandler(Signup));
UserRoutes.post("/logout", isAuth, asyncHandler(logout));
UserRoutes.delete("/delete", isAuth, asyncHandler(UserDelete));
UserRoutes.get("/mypage",isAuth, asyncHandler(myPage));
UserRoutes.post("/edit",isAuth,asyncHandler(InfoEdit));
UserRoutes.post("/findPW",asyncHandler(findPW));
UserRoutes.get("/google",asyncHandler(googleLogin));
UserRoutes.get("/kakao",asyncHandler(kakaoLogin));
UserRoutes.get("/naver",asyncHandler(naverLogin));