// import { pool } from "../../config/db.config.js";
// import { BaseError } from "../../config/error.js";
// import { status } from "../../config/response.status.js";

// // 향수 상세 정보 조회
// export const getPreviewperfumeList = async (UserID, Keyword) => {
//   try {
//     const conn = await pool.getConnection();

//     if (Keyword && Keyword.length > 0) {
//       if (Keyword.length === 1) {
//         // Keyword가 하나의 카테고리를 나타내는 배열인 경우
//         const getPerfumeListQuery = "SELECT p.Name, p.Image, up.Status, c.Keyword " + "FROM perfume p " + "JOIN userperfume up ON up.PerfumeID = p.PerfumeID " + "JOIN PerfumeCategory pc ON pc.PerfumeID = p.PerfumeID " + "JOIN Category c ON pc.CategoryID = c.CategoryID " + "WHERE up.UserID = (SELECT UserID FROM User WHERE ID = ?) AND up.Status = 'A' AND c.Keyword = ?;";
//         const [perfumeList_contents] = await pool.query(getPerfumeListQuery, [UserID, Keyword]);
//         conn.release();
//         return perfumeList_contents;
//       } else {
//         // Keyword가 여러 카테고리를 나타내는 배열인 경우
//         const placeholders = Array(Keyword.length).fill("?").join(", ");
//         const getPerfumeListQuery = "SELECT p.Name, p.Image, up.Status, c.Keyword " + "FROM perfume p " + "JOIN userperfume up ON up.PerfumeID = p.PerfumeID " + "JOIN PerfumeCategory pc ON pc.PerfumeID = p.PerfumeID " + "JOIN Category c ON pc.CategoryID = c.CategoryID " + "WHERE up.UserID = (SELECT UserID FROM User WHERE ID = ?) AND up.Status = 'A' AND c.Keyword IN (" + placeholders + ");";
//         const [perfumeList_contents] = await pool.query(getPerfumeListQuery, [UserID, ...Keyword]);
//         conn.release();
//         return perfumeList_contents;
//       }
//     } else {
//       const getPerfumeListQuery = "SELECT p.Name, p.Image, up.Status, c.Keyword " + "FROM perfume p " + "JOIN userperfume up ON up.PerfumeID = p.PerfumeID " + "JOIN PerfumeCategory pc ON pc.PerfumeID = p.PerfumeID " + "JOIN Category c ON pc.CategoryID = c.CategoryID " + "WHERE up.UserID = (SELECT UserID FROM User WHERE ID = ?) AND up.Status = 'A' ;";
//       const [perfumeList_contents] = await pool.query(getPerfumeListQuery, [UserID]);
//       conn.release();
//       return perfumeList_contents;
//     }

//     // const [perfumeList_contents] = await pool.query(getPerfumeListQuery, [UserID, Keyword]);/
//     // conn.release();
//     // return perfumeList_contents;
//   } catch (err) {
//     throw new BaseError(status.PARAMETER_IS_WRONG);
//   }
// };
