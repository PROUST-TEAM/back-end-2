// 향수 상세 정보 조회

export const getPerfumeId = "SELECT p.Name, p.NameKor, p.Description, p.Image " + "FROM perfume p " + "WHERE p.Name = ? ;";

// 향수 카테고리 정보 조회

export const getcategoryId = "SELECT c.Keyword " + "FROM PerfumeCategory pc " + "JOIN Perfume p ON pc.PerfumeID = p.PerfumeID " + "JOIN Category c ON pc.CategoryID = c.CategoryID " + "WHERE p.Name = ?;";

// 향수 찜 정보 조회

export const getlikeId = "SELECT up.Status " + "FROM userperfume up " + "JOIN Perfume p ON up.PerfumeID = p.PerfumeID " + "JOIN User u ON up.UserID = u.UserID " + "WHERE p.Name = ? AND u.UserID = ?;";

// 향수 코멘트 작성

export const confirmComment = "SELECT EXISTS(SELECT 1 FROM comment WHERE UserID = ? and Content = ?) as isExistComment;";

export const insertperfumeWriteSql = "INSERT INTO comment (UserID, Content, PerfumeID) SELECT ?, ?, PerfumeID FROM Perfume WHERE Name = ?";

export const getperfumeWriteID = "SELECT * FROM comment WHERE CommentID = ?;";

// 향수 코멘트 삭제

export const insertperfumeDeleteSql = "DELETE FROM comment WHERE PerfumeID = (SELECT PerfumeID FROM Perfume WHERE Name = ?) AND UserID = ? AND Content = ?";

// 향수 코멘트 조회 (로그인 유저)

export const getCommentUserId = "SELECT cm.Content " + "FROM comment cm JOIN perfume p ON cm.PerfumeID = p.PerfumeID " + "WHERE p.Name = ? ;";

// 향수 코멘트 조회 (비로그인 유저) -- 최신 댓글 3개까지

export const getCommentId = "SELECT cm.Content " + "FROM comment cm JOIN perfume p ON cm.PerfumeID = p.PerfumeID " + "WHERE p.Name = ?" + "ORDER BY cm.Created_At DESC LIMIT 3 ;";

// 찜 상태 조회
export const getPerfumeLikeStatusSql = "SELECT up.Status FROM userperfume up WHERE up.UserID = ? and up.PerfumeID = (SELECT PerfumeID FROM Perfume WHERE Name = ?);";

// 찜 생성
export const insertPerfumeLikeSql = "INSERT INTO userperfume (UserID, Status, PerfumeID) SELECT ?, ?, PerfumeID FROM Perfume WHERE Name = ?;";

// 찜 상태 업데이트
export const updatePerfumeLikeSql = "UPDATE userperfume SET Status = ? WHERE UserID = ? and PerfumeID = (SELECT PerfumeID FROM Perfume WHERE Name = ?);";

// 취'향'목록 조회

// export const getPerfumeListId = "SELECT p.Name, p.Image, up.Status, c.Keyword " + "FROM perfume p JOIN userperfume up ON up.PerfumeID = p.PerfumeID JOIN PerfumeCategory pc ON pc.PerfumeID = p.PerfumeID JOIN Category c ON pc.CategoryID = c.CategoryID " + "WHERE up.UserID = ? AND up.Status = 'A' AND (c.Keyword IN (?) OR ? IS NULL);";
