import * as authService from '../services/auth.Service.js'
import { response } from '../../config/response.js';
import {status} from '../../config/response.status.js';
export const Login = async (req, res, next) => {
  console.log('로그인을 요청하였습니다');
  return res.send(response(status.SUCCESS, await authService.loginService(req.body.id,req.body.password) ));
};

export const logout = (req, res, next) => {
  console.log('로그아웃을 요청하였습니다');
  return res.send(response(status.SUCCESS));
};

export const Signup = async (req, res, next) => {
  console.log('회원가입을 요청했습니다');
  return res.send(response(status.SUCCESS, await authService.signupService
    (req.body.id, req.body.password,req.body.name,req.body.confirmPassword,req.body.UserAgree,req.body.userInputCode,req.session.authCode)))
};

export const UserDelete = async (req, res, next) => {
  console.log('회원탈퇴를 요청했습니다');
  return res.send(response(status.SUCCESS, await authService.userDeleteService(req.userId) ));
};

export const myPage= async (req,res,next)=>{
  console.log('마이페이지를 요청하였습니다');
  return res.send(response(status.SUCCESS, await authService.myPageService(req.userId) ));
};

export const InfoEdit= async (req,res,next)=>{
  console.log('회원정보 수정을 요청하였습니다');
  return res.send(response(status.SUCCESS, await authService.infoEditService
    (req.userId,req.body.password,req.body.name, req.body.confrimPassword) ));
};

export const sendAuthCode = async (req, res, next) => {  
  console.log('이메일 인증을 요청하였습니다');
  const authCode = await authService.emailAuth(req.body.id);
  req.session.authCode = authCode;
  return res.send(response(status.SUCCESS, authCode ));
};

export const findPW = async (req, res, next) => {
  console.log('비밀번호 찾기를 요청하였습니다');
  return res.send(response(status.SUCCESS, await authService.findPWService(req.body.id,req.body.userInputCode,req.session.authCode) ));
};



