import { pool } from "../../config/db.config.js";
const generateRandomNumber = function(min, max) {
    const randomNumber = Math.floor(Math.random() * (max-min+1)) + min;
    return randomNumber
}
export class User {
  static async findById(id) {
    const query = "SELECT * FROM user WHERE id = ?";

    try {
      const [rows, fields] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error finding user by id:", error);
      throw new Error("사용자 조회 중 오류가 발생했습니다.");
    }
  }

  static async deleteById(id) {
    const query = "DELETE FROM user WHERE id = ?";

    try {
      const [result] = await pool.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting user by id:", error);
      throw new Error("사용자 삭제 중 오류가 발생했습니다.");
    }
  }

  static async addUser(ID, UserName, Password,UserAgree) {
    const query = "INSERT INTO user (ID, UserName, Password,UserAgree) VALUES (?, ?, ?, ?)";

    try {
      const [result] = await pool.query(query, [ID, UserName, Password, UserAgree]);
      return result;
    } catch (error) {
      console.error("저장 중에 오류가 발생하였습니다", error);
      throw new Error("사용자 등록 중에 에러가 발생하였습니다");
    }
  }
  static async getMyInfo(id){
    const query="SELECT UserName, id, password FROM User WHERE id = ?";
    try {
      const [rows, fields] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("사용자 조회 중 오류가 발생했습니다.");
    }
  }
  static async updateUser(id, UserName, Password){
    const query = "UPDATE user SET UserName = ?, Password = ? WHERE ID = ?";
    try {
      const [result] = await pool.query(query, [UserName, Password, id]);
      return result;
    } catch (error) {
      console.error("저장 중에 오류가 발생하였습니다", error);
      throw new Error("사용자 수정 중에 에러가 발생하였습니다");
    }
  }
  static async createAuthcode(id){
    const code = generateRandomNumber(111111, 999999);
    const createTime = new Date();
    const expireTime = new Date(createTime.getTime() + 5*60*1000); // 5분 후

    const query = "UPDATE user SET ValidCode = ?, createTime = ?, expireTime = ? WHERE ID = ?";
    try {
      const [result] = await pool.query(query, [code, createTime, expireTime, id]);
      return code;
    } catch (error) {
      console.error("저장 중에 오류가 발생하였습니다", error);
      throw new Error("인증 코드 생성 중에 에러가 발생하였습니다");
    }
}
  static async verifyAuthcode(id, inputCode) {
    const query = "SELECT * FROM user WHERE ID = ?";
    try {
      const [rows, fields] = await pool.query(query, [id]);
      const user = rows[0];
      if (!user) {
          throw new Error("사용자 조회 중 오류가 발생했습니다.");
      }
      if (new Date() > user.expireTime) {
          throw new Error("코드가 만료되었습니다.");
      }
      if (Number(inputCode) !== Number(user.ValidCode)) {
          throw new Error("코드가 일치하지 않습니다.");
      }
      return true;
    } catch (error) {
      console.error("Error verifying auth code:", error);
      throw error;
    }
}
static async UpdatePass (id,tempPassword){
  const query = "UPDATE user SET password = ? WHERE ID = ?";
  try {
    const [result] = await pool.query(query, [tempPassword, id]);
    return result;
} catch (error) {
    console.error("비밀번호 업데이트 중에 오류가 발생하였습니다", error);
    throw new Error("비밀번호 업데이트 중에 에러가 발생하였습니다");
}
}
static async addSocialUser(SNSAccountType, SNSAccountID, UserName, password){
  const query = "INSERT INTO user (SNSAccountType, SNSAccountID, UserName, Password) VALUES (?, ?, ?, ?)";
  try {
      const [result] = await pool.query(query, [SNSAccountType, SNSAccountID, UserName, password]);
      return result;
  } catch (error) {
      console.error("저장 중에 오류가 발생하였습니다", error);
      throw new Error("사용자 등록 중에 에러가 발생하였습니다");
  }
}

static async findBySocialId(id) {
    const query = "SELECT * FROM user WHERE SNSAccountID = ?";

    try {
      const [rows, fields] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error finding user by id:", error);
      throw new Error("사용자 조회 중 오류가 발생했습니다.");
    }
  }

  }





// module.exports = User;
