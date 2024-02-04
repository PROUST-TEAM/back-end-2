// 향수 상세 정보 조회

export const getPerfumeId = "SELECT p.Name, p.NameKor, p.Description, p.Image " + "FROM perfume p " + "WHERE p.PerfumeId = ? ;";

// 향수 카테고리 정보 조회

export const getcategoryId = "SELECT c.Keyword " + "FROM perfumecategory pc JOIN perfume p ON pc.PerfumeId = p.PerfumeId JOIN category c ON pc.CategoryID = c.CategoryID " + "WHERE pc.PerfumeId = ? ;";

// 향수 코멘트 작성

export const insertperfumeWriteSql = "INSERT INTO comment (PerfumeID, UserID, Content) VALUES (?, ?, ?);";

export const getperfumeWriteID = "SELECT * FROM comment WHERE CommentID = ?;";

// 향수 코멘트 삭제

export const insertperfumeDeleteSql = "DELETE FROM comment WHERE PerfumeID = ? and UserID = ? and CommentID = ?";
