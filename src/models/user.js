import { pool } from "../../config/db.config.js";

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
  try {
      
      const insertQuery = "INSERT INTO user (SNSAccountType, ID, UserName, Password) VALUES (?, ?, ?, ?)";
      await pool.query(insertQuery, [SNSAccountType, SNSAccountID, UserName, password]);
      const selectQuery = "SELECT * FROM user WHERE ID = ?";
      const [rows] = await pool.query(selectQuery, [SNSAccountID]);

      return rows[0];  // 새로 생성된 사용자의 정보를 반환
  } catch (error) {
      console.error("저장 중에 오류가 발생하였습니다", error);
      throw new Error("사용자 등록 중에 에러가 발생하였습니다");
  }
}

static async findBySocialId(id) {
    const query = "SELECT * FROM user WHERE ID = ?";

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
