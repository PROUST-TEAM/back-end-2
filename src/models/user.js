import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
export class User {
  static async findById(id) {
    const query = "SELECT * FROM user WHERE id = ?";

    try {
      const [rows, fields] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }

  static async deleteById(id) {
    const query = "DELETE FROM user WHERE id = ?";

    try {
      const [result] = await pool.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
       throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }

  static async addUser(ID, UserName, Password,UserAgree) {
    const query = "INSERT INTO user (ID, UserName, Password,UserAgree) VALUES (?, ?, ?, ?)";

    try {
      const [result] = await pool.query(query, [ID, UserName, Password, UserAgree]);
      return result;
    } catch (error) {
       throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }
  static async getMyInfo(id){
    const query="SELECT UserName, id, password FROM User WHERE id = ?";
    try {
      const [rows, fields] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
  }
}

  static async updateUser(id, UserName, Password){
    const query = "UPDATE user SET UserName = ?, Password = ? WHERE ID = ?";
    try {
      const [result] = await pool.query(query, [UserName, Password, id]);
      return result;
    } catch (error) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }
  
static async UpdatePass (id,tempPassword){
  const query = "UPDATE user SET password = ? WHERE ID = ?";
  try {
    const [result] = await pool.query(query, [tempPassword, id]);
    return result;
} catch (error) {
     throw new BaseError(status.PARAMETER_IS_WRONG);
}
}

static async addSocialUser(SNSAccountType, SNSAccountID, UserName, password){
  try {
      
      const insertQuery = "INSERT INTO user (SNSAccountType, ID, UserName, Password) VALUES (?, ?, ?, ?)";
      await pool.query(insertQuery, [SNSAccountType, SNSAccountID, UserName, password]);
      const selectQuery = "SELECT * FROM user WHERE ID = ?";
      const [rows] = await pool.query(selectQuery, [SNSAccountID]);

      return rows[0];  
  } catch (error) {
       throw new BaseError(status.PARAMETER_IS_WRONG);
  }
}

static async findBySocialId(id) {
    const query = "SELECT * FROM user WHERE ID = ?";

    try {
      const [rows, fields] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
       throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  }

  }





// module.exports = User;
