import express from "express";
import { isAuth } from "../middlewares/jwt.js";
import { Login, logout, UserDelete, myPage, InfoEdit } from "../controllers/auth.controller.js";
// , Signup, findPW, sendAuthCode
import asyncHandler from "express-async-handler";
// import passport from "passport";
// import { SocialKakao } from "../passport/kakaoStrategy.js";
// import { SocialGoogle } from "../passport/googleStrategy.js";
// import { SocialNaver } from "../passport/naverStrategy.js";
// import { response } from "../../config/response.js";
export const UserRoutes = express.Router();

// SocialKakao();
// SocialGoogle();
// SocialNaver();

UserRoutes.post("/login", asyncHandler(Login));
// UserRoutes.post("/signup/request", asyncHandler(sendAuthCode));
// UserRoutes.post("/signup/confirm", asyncHandler(Signup));
UserRoutes.post("/logout", isAuth, asyncHandler(logout));
UserRoutes.delete("/delete", isAuth, asyncHandler(UserDelete));
UserRoutes.get("/mypage", isAuth, asyncHandler(myPage));
UserRoutes.post("/edit", isAuth, asyncHandler(InfoEdit));
// UserRoutes.post("/findPW/request", asyncHandler(sendAuthCode));
// UserRoutes.post("/findPW/confirm", asyncHandler(findPW));

// UserRoutes.get("/kakao", passport.authenticate("kakao", { session: false }));
// UserRoutes.get("/kakao/callback", passport.authenticate("kakao", { session: false, failureRedirect: "/" }), (req, res) => {
//     res.status(200).json(response({ isSuccess: true, code: 200, message: '로그인에 성공하였습니다.'},req.user));
// });
// UserRoutes.get("/google", passport.authenticate("google", { session: false, scope:['profile','email'] }));
// UserRoutes.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/" }), (req, res) => {
//     res.status(200).json(response({ isSuccess: true, code: 200, message: '로그인에 성공하였습니다.'}, req.user));
// });
// UserRoutes.get("/naver", passport.authenticate("naver", { session: false }));
// UserRoutes.get("/naver/callback", passport.authenticate("naver", { session: false, failureRedirect: "/" }), (req, res) => {
//     res.status(200).json(response({ isSuccess: true, code: 200, message: '로그인에 성공하였습니다.'},req.user));
// });
