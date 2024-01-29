const db=require('../../config/db.config');
class User{

  static async findById(id) {
    const query = 'SELECT * FROM user WHERE id = ?';
    
    try {
      const [rows, fields] = await db.query(query, [id]);
      return rows[0]; 
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('사용자 조회 중 오류가 발생했습니다.');
    }
  }

  static async deleteById(id) {
    const query = 'DELETE FROM user WHERE id = ?';

    try {
      const [result] = await db.query(query, [id]);
      return result.affectedRows > 0; 
    } catch (error) {
      console.error('Error deleting user by id:', error);
      throw new Error('사용자 삭제 중 오류가 발생했습니다.');
    }
}

  static async addUser(ID, UserName, Password){
  const query = "INSERT INTO user (ID, userName, password) VALUES (?, ?, ?)";
  
  try {
    const [result] = await db.query(query, [ID, UserName, Password]);
    return result;
  } catch(error) {
    console.error('저장 중에 오류가 발생하였습니다', error);
    throw new Error('사용자 등록 중에 에러가 발생하였습니다');
  }
}
}

module.exports = User;
