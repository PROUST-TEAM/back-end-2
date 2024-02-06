// 향수 상세 정보 조회

export const getPerfumeId = "SELECT p.Name, p.NameKor, p.Description, p.Image " + "FROM perfume p " + "WHERE p.PerfumeId = ? ;";

// 향수 카테고리 정보 조회

export const getcategoryId = "SELECT c.Keyword " + "FROM perfumecategory pc JOIN perfume p ON pc.PerfumeId = p.PerfumeId JOIN category c ON pc.CategoryID = c.CategoryID " + "WHERE pc.PerfumeId = ? ;";

// 향수 코멘트 작성

export const insertperfumeWriteSql = "INSERT INTO comment (PerfumeID, UserID, Content) VALUES (?, ?, ?);";

export const getperfumeWriteID = "SELECT * FROM comment WHERE CommentID = ?;";

// 향수 코멘트 삭제

export const insertperfumeDeleteSql = "DELETE FROM comment WHERE PerfumeID = ? and UserID = ? and CommentID = ?";

// 향수 코멘트 조회 (로그인 유저)

export const getCommentUserId = "SELECT cm.Content " + "FROM comment cm JOIN perfume p ON cm.PerfumeId = p.PerfumeId " + "WHERE p.PerfumeId = ? ;";

// 향수 코멘트 조회 (비로그인 유저) -- 최신 댓글 3개까지

export const getCommentId = "SELECT cm.Content " + "FROM comment cm JOIN perfume p ON cm.PerfumeId = p.PerfumeId " + "WHERE p.PerfumeId = ?" + "ORDER BY cm.Created_At DESC LIMIT 3 ;";

// 찜 상태 조회
export const getPerfumeLikeStatusSql = "SELECT up.Status FROM userperfume up WHERE up.PerfumeID = ? and up.UserID = ?;";

// 찜 생성
export const insertPerfumeLikeSql = "INSERT INTO userperfume (PerfumeID, UserID, Status) VALUES (?, ?, ?);";

// 찜 상태 업데이트
export const updatePerfumeLikeSql = "UPDATE userperfume SET Status = ? WHERE PerfumeID = ? and UserID = ?;";
