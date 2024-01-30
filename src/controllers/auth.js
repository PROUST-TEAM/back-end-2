import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import { validationResult } from "express-validator";

export const Login = async (req, res, next) => {
  //로그인
  const id = req.body.id;
  const password = req.body.password;
  try {
    const user = await User.findById(id);
    if (!user) {
      const error = new Error("사용자를 찾을 수 없습니다");
      error.statusCode = 401;
      throw error;
    }
    const doMatch = await bcrypt.compare(password, user.Password);
    if (!doMatch) {
      const error = new Error("로그인 할 수 없습니다");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user.ID.toString(),
      },
      "secretsecretsecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ message:'로그인 성공',token: token, userId: user.ID.toString() });
  
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const logout = (req, res, next) => {
  // 로그아웃
  console.log("로그아웃 성공");
  return res.clearCookie("token").end();
};

export const Signup = async (req, res, next) => {
  // 회원가입
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("에러가 발생하였습니다");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const id = req.body.id;
  const password = req.body.password;
  const userName = req.body.name;
  const confirmPassword = req.body.confirmPassword;
  if (password !== confirmPassword) {
    const error = new Error("비밀번호가 일치하지 않습니다");
    error.statusCode = 422;
    throw error;
  }
  try {
    const existingUser = await User.findById(id);
    if (existingUser) {
      const error = new Error("존재하는 아이디 입니다");
      error.statusCode = 401;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.addUser(id, userName, hashedPassword);
    res.status(201).json({ message: "회원가입 완료", userId: result.id });
    console.log("회원가입 완료");
  } catch (err) {
    console.error("사용자 저장 중 에러 발생", err);
    const error = new Error("에러 발생");
    error.statusCode = 500;
    throw error;
  }
};

export const UserDelete = async (req, res, next) => {
  //회원탈퇴
  const UserID = req.params.id;
  try {
    const user = await User.findById(UserID);
    if (!user) {
      const error = new Error("사용자를 찾을 수 없습니다");
      error.statusCode = 404;
      throw error;
    }
    const result = await User.deleteById(UserID);
    console.log("삭제되었습니다", result);
    res.status(200).json({ message: "삭제되었습니다" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
