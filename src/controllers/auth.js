import * as authService from '../services/authService.js'
import { response } from '../../config/response.js';

export const Login = async (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  const result = await authService.loginService(id, password);
  res.status(200).json(response({ isSuccess: true, code: 200, message: '로그인 성공' }, result));
};

export const logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json(response({ isSuccess: true, code: 200, message: '로그아웃 성공' }));
};

export const Signup = async (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  const userName = req.body.name;
  const confirmPassword = req.body.confirmPassword;
  const result = await authService.signupService(id, password, userName, confirmPassword);
  res.status(201).json(response({ isSuccess: true, code: 200, message: '회원가입 완료' }, result));
};

export const UserDelete = async (req, res, next) => {
  const UserID = req.userId;
  const result = await authService.userDeleteService(UserID);
  res.status(200).json(response({ isSuccess: true, code: 200, message: '삭제 성공' }, result));
};

export const myPage= async (req,res,next)=>{
  const UserID = req.userId;
  const result = await authService.myPageService(UserID);
  res.status(200).json(response({ isSuccess: true, code: 200, message: 'mypage 조회 성공' }, result));
};

export const InfoEdit= async (req,res,next)=>{
  const UserID =req.userId;
  const password = req.body.password;
  const userName = req.body.name;
  const confirmPassword = req.body.confirmPassword;
  const result = await authService.infoEditService(UserID, password, userName, confirmPassword);
  res.status(200).json(response({ isSuccess: true, code: 201, message: '정보 수정 완료' }, result));
};

export const findPW = async (req, res, next) => {
  const { id, userInputCode } = req.body;

  if (userInputCode) {
    // 사용자로부터 인증번호를 받았을 때
    await authService.findPWService(id, userInputCode);
    res.status(200).json(response({ isSuccess: true, code: 200, message: '임시 비밀번호가 이메일로 전송되었습니다.' }));
  } else {
    // 사용자로부터 인증번호를 받지 않았을 때 (처음 호출될 때)
    await authService.emailAuth(id);
    res.status(200).json(response({ isSuccess: true, code: 200, message: '인증번호가 이메일로 전송되었습니다.' }));
  }
};

export const kakaoLogin = async(req,res,next)=>{
  const headers =req.headers["authorization"];
  const kakaoToken = headers.split(" ")[1];
  const accessToken = await authService.kakaoService(kakaoToken);

  return res.status(200).json(response({isSuccess: true, code: 200, accessToken: accessToken }));
}

