import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import{status} from "../../config/response.status.js"
import { smtpTransport } from "../../config/email.js"
import session from "express-session";

const isEmail=(email)=>{
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const generateRandomPassword=()=> {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}
const generateRandomNumber = function(min, max) {
    const randomNumber = Math.floor(Math.random() * (max-min+1)) + min;
    return randomNumber
}
export const loginService = async (id, password) => {
  const user = await User.findById(id);
  if (!id || !password) {
    throw new Error(status.LOGIN_ID_OR_PASSWORD_EMPTY);
  }
  if (!isEmail(id)) {
    throw new Error(status.LOGIN_ID_NOT_EMAIL);
  }
  if (password.length < 8) {
    throw new Error(status.LOGIN_PASSWORD_SHORT);
  }
  if (!user) {
    throw new Error(status.LOGIN_ID_NOT_EXIST);
  }
  const doMatch = await bcrypt.compare(password, user.Password);
  if (!doMatch) {
    throw new Error(status.LOGIN_PASSWORD_WRONG);
  }
  const token = jwt.sign(
    {
      userId: user.ID.toString(),
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return { message:'로그인 성공',token: token, userId: user.ID.toString() };
};
export const signupService = async (id, password, userName, confirmPassword, UserAgree,userInputCode,sessionAuthCode) => {

    if (!id || !password || !userName|| !UserAgree) {
      throw new Error(status.SIGNUP_INPUT_EMPTY);
    }
    if (!isEmail(id)) {
      throw new Error(status.SIGNUP_ID_NOT_EMAIL);
    }
    if (password.length < 8) {
      throw new Error(status.SIGNUP_PASSWORD_SHORT);
    }
    if (password !== confirmPassword) {
      throw new Error(status.SIGNUP_PASSWORD_NOT_MATCH);
    }
    const existingUser = await User.findById(id);
    if (existingUser) {
      throw new Error(status.SIGNUP_ID_DUPLICATE);
    }
    if(parseInt(UserAgree)===0){
      throw new Error("약관 동의가 되지 않았습니다");
    }
    if(Number(userInputCode)!==Number(sessionAuthCode)){
      throw new Error("인증 코드가 일치하지 않습니다");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.addUser(id, userName, hashedPassword, UserAgree);
    return { message: "회원가입 완료", userId: result.id };

};
export const userDeleteService = async (UserID) => {
    const user = await User.findById(UserID);
    if (!user) {
      throw new Error(status.MEMBER_NOT_FOUND);
    }
    const result = await User.deleteById(UserID);
      return { message: "삭제되었습니다" };
};

export const myPageService = async(UserID) => {
    const user = await User.findById(UserID);
    if (!user) {
      throw new Error(status.MYPAGE_NOT_MEMBER);
    }
    const result = await User.getMyInfo(UserID);
    return { message: "mypage 조회", userId: result.id, password: result.password, name: result.UserName };
};

export const infoEditService = async(UserID, password, userName, confirmPassword) => {
    if (!UserID || !password || !userName) {
      throw new Error(JSON.stringify(status.MEMBER_UPDATE_INPUT_EMPTY));
    }
    if (!isEmail(UserID)) {
      throw new Error(JSON.stringify(status.MEMBER_UPDATE_ID_NOT_EMAIL));
    }
    if (password.length < 8) {
      throw new Error(JSON.stringify(status.MEMBER_UPDATE_PASSWORD_SHORT));
    }
    if (password !== confirmPassword) {
      throw new Error(JSON.stringify(status.MEMBER_UPDATE_PASSWORD_NOT_MATCH));
    }
    const existingUser = await User.findById(UserID);
      if (!existingUser) {
        throw new Error(JSON.stringify(status.MEMBER_UPDATE_NOT_MEMBER));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.updateUser(UserID,userName, hashedPassword);
    return { message: "정보 수정 완료", userId: result.id };
};


export const findPWService = async(id, userInputCode,sessionAuthCode) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(status.FIND_PW_NOT_EXIST);
    }
    if(Number(userInputCode)!==Number(sessionAuthCode)){
      throw new Error("인증 코드가 일치하지 않습니다");
    }
    else{
        const tempPassword = generateRandomPassword();

        const hashedPassword = await bcrypt.hash(tempPassword, 10);
        user.password = hashedPassword;
        const result=await User.UpdatePass(id, hashedPassword);
        return {message:"변경된 비밀번호",id:result.id,password: tempPassword};
    }
  };
export const emailAuth = async(id) => {
    try {
       
        const authCode=generateRandomNumber(111111,999999);
      

        const mailOptions = {
            from : "qws1566@naver.com ",
            to : id, 
            subject : "인증 관련 메일 입니다. ",
            html : '<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1>' + authCode
        }

        await new Promise((resolve, reject) => {
            smtpTransport.sendMail(mailOptions, (err, response) => {
                console.log("response", response);
                if(err) {
                    console.log(' 메일 전송에 실패하였습니다. ');
                    console.log(err);
                    smtpTransport.close(); 
                    reject(new Error(' 메일 전송에 실패하였습니다. '));
                } else {
                    console.log(' 메일 전송에 성공하였습니다. ');
                    smtpTransport.close(); 
                    resolve(); 
                }
            });
        });
       return authCode;
    } catch (error) {
        console.error(error);
        return { ok: false, msg: '오류가 발생했습니다.' };
    }
};

