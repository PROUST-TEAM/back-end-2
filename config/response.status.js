import { StatusCodes } from "http-status-codes";

export const status = {
  // success
  SUCCESS: { status: StatusCodes.OK, isSuccess: true, code: 2000, message: "success!" },

  // error
  // common err
  INTERNAL_SERVER_ERROR: { status: StatusCodes.INTERNAL_SERVER_ERROR, isSuccess: false, code: "COMMON000", message: "서버 에러, 관리자에게 문의 바랍니다." },
  BAD_REQUEST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "COMMON001", message: "잘못된 요청입니다." },
  UNAUTHORIZED: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "COMMON002", message: "권한이 잘못되었습니다." },
  METHOD_NOT_ALLOWED: { status: StatusCodes.METHOD_NOT_ALLOWED, isSuccess: false, code: "COMMON003", message: "지원하지 않는 Http Method 입니다." },
  FORBIDDEN: { status: StatusCodes.FORBIDDEN, isSuccess: false, code: "COMMON004", message: "금지된 요청입니다." },
  NOT_FOUND: { status: StatusCodes.NOT_FOUND, isSuccess: false, code: "COMMON005", message: "요청한 페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다." },

  // member err
  MEMBER_NOT_FOUND: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MEMBER4001", message: "사용자가 없습니다." },
  NICKNAME_NOT_EXIST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MEMBER4002", message: "닉네임은 필수입니다." },
  EMAIL_ALREADY_EXIST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MEMBER4003", message: "이미 가입된 이메일이 존재합니다." },

  // db error
  PARAMETER_IS_WRONG: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "DATABASE4001", message: "쿼리 실행 시 전달되는 파라미터가 잘못되었습니다. 파라미터 개수 혹은 파라미터 형식을 확인해주세요." },

  // article err
  ARTICLE_NOT_FOUND: { status: StatusCodes.NOT_FOUND, isSuccess: false, code: "ARTICLE4001", message: "게시글이 없습니다." },

  // login err
  LOGIN_PARAM_NOT_EXIST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "SIGNIN4001", message: "ID 혹은 PW 값이 존재하지 않습니다." },
  LOGIN_ID_NOT_EXIST: { status: StatusCodes.NOT_FOUND, isSuccess: false, code: "SIGNIN4002", message: "아이디를 찾을 수 없습니다." },
  LOGIN_PASSWORD_WRONG: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "SIGNIN4003", message: "비밀번호가 일치하지 않습니다." },

  // comment err
  COMMENT_ALREADY_EXIST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "COMMENT4001", message: "같은 내용의 코멘트가 존재합니다." },

  LOGIN_ID_OR_PASSWORD_EMPTY: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "LOGIN4001", message: "ID 혹은 PW 값이 존재하지 않습니다." },
  LOGIN_ID_NOT_EMAIL: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "LOGIN4002", message: "ID는 이메일 형식이어야 합니다." },
  LOGIN_PASSWORD_SHORT: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "LOGIN4003", message: "비밀번호는 8자리 이상이어야 합니다." },
  // 회원 가입 관련 에러
  SIGNUP_AGREE_FALSE:{status: StatusCodes.BAD_REQUEST, isSuccess:false, code: "SIGNUP4007", message:"약관 동의가 되지 않았습니다"},
  SIGNUP_EMAIL_DUPLICATE: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "SIGNUP4001", message: "이미 사용 중인 이메일입니다." },
  SIGNUP_NICKNAME_DUPLICATE: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "SIGNUP4002", message: "이미 사용 중인 닉네임입니다." },
  SIGNUP_INPUT_EMPTY: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "SIGNUP4003", message: "입력 값(ID, PW, 이름) 중 하나가 비어있습니다." },
  SIGNUP_ID_NOT_EMAIL: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "SIGNUP4004", message: "ID는 이메일 형식이어야 합니다." },
  SIGNUP_PASSWORD_SHORT: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "SIGNUP4005", message: "비밀번호는 8자리 이상이어야 합니다." },
  SIGNUP_PASSWORD_NOT_MATCH: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "SIGNUP4006", message: "비밀번호와 확인 비밀번호가 일치하지 않습니다." },
  // 회원 탈퇴 관련 에러
  WITHDRAWAL_NOT_MEMBER: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "WITHDRAWAL4001", message: "존재하지 않는 사용자입니다." },

  // 로그아웃 관련 에러
  LOGOUT_NOT_LOGGED_IN: { status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "LOGOUT4001", message: "로그인 상태가 아닙니다." },

  // 아이디 찾기 관련 에러
  FIND_ID_NOT_EXIST_EMAIL: { status: StatusCodes.NOT_FOUND, isSuccess: false, code: "FINDID4001", message: "등록되지 않은 이메일입니다." },

  // 비밀번호 찾기 관련 에러
  FIND_PW_NOT_EXIST_ID: { status: StatusCodes.NOT_FOUND, isSuccess: false, code: "FINDPW4001", message: "등록되지 않은 아이디입니다." },

  // 마이페이지 조회 관련 에러
  MYPAGE_NOT_MEMBER: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MYPAGE4001", message: "존재하지 않는 사용자입니다." },

  // 회원 수정 관련 에러
  MEMBER_UPDATE_NOT_MEMBER: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MEMUPDATE4001", message: "존재하지 않는 사용자입니다." },
  MEMBER_UPDATE_DUPLICATE_EMAIL: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MEMUPDATE4002", message: "이미 사용 중인 이메일입니다." },
  MEMBER_UPDATE_DUPLICATE_NICKNAME: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MEMUPDATE4003", message: "이미 사용 중인 닉네임입니다." },

  MEMBER_UPDATE_INPUT_EMPTY: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MEMUPDATE4004", message: "입력 값(ID, PW, 이름) 중 하나가 비어있습니다." },
  MEMBER_UPDATE_ID_NOT_EMAIL: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MEMUPDATE4005", message: "ID는 이메일 형식이어야 합니다." },
  MEMBER_UPDATE_PASSWORD_SHORT: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MEMUPDATE4006", message: "비밀번호는 8자리 이상이어야 합니다." },
  MEMBER_UPDATE_PASSWORD_NOT_MATCH: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "MEMUPDATE4007", message: "비밀번호와 확인 비밀번호가 일치하지 않습니다." },
  VALID_CODE_NOT_MATCH:{status:StatusCodes.BAD_REQUEST,isSuccess:false,code:"VALID4001",message:"인증 코드가 일치하지 않습니다"},
  EMAIL_SEND_ERR:{status:StatusCodes.BAD_REQUEST,isSuccess:false,code:"VALID4001",message:"이메일이 전송되지 않았습니다"},
  // comment err
  COMMENT_ALREADY_EXIST: { status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "COMMENT4001", message: "같은 내용의 코멘트가 존재합니다." },
};
