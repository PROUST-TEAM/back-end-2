// 향수 상세 정보 조회

export const getPerfumeId = "SELECT p.Name, p.NameKor, p.Description, p.Image " + "FROM Perfume p " + "WHERE p.Name = ? ;";

// 향수 카테고리 정보 조회

export const getcategoryId = "SELECT c.Keyword " + "FROM PerfumeCategory pc " + "JOIN Perfume p ON pc.PerfumeID = p.PerfumeID " + "JOIN Category c ON pc.CategoryID = c.CategoryID " + "WHERE p.Name = ?;";

// 향수 찜 정보 조회

export const getlikeId = "SELECT up.Status " + "FROM UserPerfume up " + "JOIN Perfume p ON up.PerfumeID = p.PerfumeID " + "JOIN User u ON up.UserID = u.UserID " + "WHERE p.Name = ? AND u.ID = ?;";

// 향수 코멘트 작성

export const confirmComment = "SELECT EXISTS(SELECT 1 FROM Comment WHERE UserID = (SELECT UserID FROM User WHERE ID = ?) and Content = ?) as isExistComment;";

export const insertperfumeWriteSql = "INSERT INTO Comment (UserID, Content, PerfumeID) SELECT (SELECT UserID FROM User WHERE ID = ?), ?, PerfumeID FROM Perfume WHERE Name = ?";

export const getperfumeWriteID = "SELECT * FROM Comment WHERE CommentID = ?;";

// 향수 코멘트 삭제

export const insertperfumeDeleteSql = "DELETE FROM Comment WHERE PerfumeID = (SELECT PerfumeID FROM Perfume WHERE Name = ?) AND UserID = (SELECT UserID FROM User WHERE ID = ?) AND Content = ?";

// 향수 코멘트 조회 (로그인 유저)

export const getCommentUserId = "SELECT cm.Content " + "FROM Comment cm JOIN Perfume p ON cm.PerfumeID = p.PerfumeID " + "WHERE p.Name = ? ;";

// 향수 코멘트 조회 (비로그인 유저) -- 최신 댓글 3개까지

export const getCommentId = "SELECT cm.Content " + "FROM Comment cm JOIN Perfume p ON cm.PerfumeID = p.PerfumeID " + "WHERE p.Name = ?" + "ORDER BY cm.Created_At DESC LIMIT 3 ;";

// 찜 상태 조회
export const getPerfumeLikeStatusSql = "SELECT up.Status FROM UserPerfume up WHERE up.UserID = (SELECT UserID FROM User WHERE ID = ?) and up.PerfumeID = (SELECT PerfumeID FROM Perfume WHERE Name = ?);";

// 찜 생성
export const insertPerfumeLikeSql = "INSERT INTO UserPerfume (UserID, Status, PerfumeID) SELECT (SELECT UserID FROM User WHERE ID = ?), ?, PerfumeID FROM Perfume WHERE Name = ?;";

// 찜 상태 업데이트
export const updatePerfumeLikeSql = "UPDATE UserPerfume SET Status = ? WHERE UserID = (SELECT UserID FROM User WHERE ID = ?) and PerfumeID = (SELECT PerfumeID FROM Perfume WHERE Name = ?);";

// 취'향'목록 조회

// export const getPerfumeListId = "SELECT p.Name, p.Image, up.Status, c.Keyword " + "FROM perfume p JOIN userperfume up ON up.PerfumeID = p.PerfumeID JOIN PerfumeCategory pc ON pc.PerfumeID = p.PerfumeID JOIN Category c ON pc.CategoryID = c.CategoryID " + "WHERE up.ID = ? AND up.Status = 'A' AND (c.Keyword IN (?) OR ? IS NULL);";
