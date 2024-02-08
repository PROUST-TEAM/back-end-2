import * as authService from '../services/auth.Service.js'
import { response } from '../../config/response.js';

export const Login = async (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  const result = await authService.loginService(id, password);
  res.status(200).json(response({ isSuccess: true, code: 200, message: '로그인 성공' }, result));
};

export const logout = (req, res, next) => {
  res.status(200).json(response({ isSuccess: true, code: 200, message: '로그아웃 성공' }));
};

export const Signup = async (req, res, next) => {
  const id = req.body.id;
  const password = req.body.password;
  const userName = req.body.name;
  const confirmPassword = req.body.confirmPassword;
  const UserAgree= req.body.UserAgree;
  const userInputCode= req.body.userInputCode;
  const sessionAuthCode= req.session.authCode;
  const result = await authService.signupService(id, password, userName, confirmPassword,UserAgree,userInputCode,sessionAuthCode);
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

export const sendAuthCode = async (req, res, next) => {  
  const { id } = req.body;
  const authCode = await authService.emailAuth(id);
  req.session.authCode = authCode;
  res.status(200).json(response({ isSuccess: true, code: 200, message: '인증번호가 이메일로 전송되었습니다.' }));  
};

export const findPW = async (req, res, next) => {
  const { id, userInputCode } = req.body;
  const sessionAuthCode= req.session.authCode;
  const result=await authService.findPWService(id, userInputCode,sessionAuthCode);
  res.status(200).json(response({ isSuccess: true, code: 200, message: '비밀번호가 초기화 되었습니다'},result)); 
};



