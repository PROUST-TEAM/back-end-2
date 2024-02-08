import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getPerfumeId, getcategoryId, getlikeId, getperfumeWriteID, insertperfumeWriteSql, insertperfumeDeleteSql, getCommentUserId, getCommentId, insertPerfumeLikeSql, updatePerfumeLikeSql, getPerfumeLikeStatusSql, confirmComment } from "./perfume.sql.js";

// 향수 상세 정보 조회
export const getPreviewperfumeContent = async (Name) => {
  try {
    const conn = await pool.getConnection();

    // console.log("Query Parameters:", PerfumeID);
    const [perfume_contents] = await pool.query(getPerfumeId, Name);
    conn.release();
    return perfume_contents;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 카테고리 정보 조회
export const getPreviewcategoryContent = async (Name) => {
  try {
    const conn = await pool.getConnection();

    // console.log("Query Parameters:", Name);
    const [category_contents] = await pool.query(getcategoryId, Name);
    conn.release();
    return category_contents;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 찜 정보 조회
export const getPreviewlikeContent = async (Name, UserID) => {
  try {
    const conn = await pool.getConnection();

    // console.log("Query Parameters:", Name);
    const [like_contents] = await pool.query(getlikeId, [Name, UserID]);
    conn.release();
    return like_contents;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 코멘트 데이터 삽입
export const addperfumeWrite = async (Name, UserID, data) => {
  try {
    const conn = await pool.getConnection();

    const [confirm] = await pool.query(confirmComment, [UserID, data.Content]);

    if (confirm[0].isExistComment) {
      conn.release();
      return -1;
    }

    // console.log("Inserting perfumeWrite:", Name, UserID, data); // 추가: 데이터가 올바르게 전달되는지 확인하기 위한 로그

    // const result = await pool.query(insertperfumeWriteSql, [Name, UserID, data.Content]);
    const result = await pool.query(insertperfumeWriteSql, [UserID, data.Content, Name]);

    conn.release();
    return result[0].insertId;
  } catch (err) {
    console.error("Error in addperfumeWrite:", err); // 추가: 에러 발생 시 에러 메시지 출력
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 코멘트 정보 얻기
export const getperfumeWrite = async (perfumeWriteId) => {
  try {
    const conn = await pool.getConnection();
    const [perfumeWrite] = await pool.query(getperfumeWriteID, perfumeWriteId);

    console.log(perfumeWrite);

    if (perfumeWrite.length == 0) {
      return -1;
    }

    conn.release();
    return perfumeWrite;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 코멘트 데이터 삭제
export const addperfumeDelete = async (Name, UserID, Content) => {
  try {
    const conn = await pool.getConnection();

    // console.log("Inserting perfumeDelete:", Name, UserID, Content); // 추가: 데이터가 올바르게 전달되는지 확인하기 위한 로그

    const result = await pool.query(insertperfumeDeleteSql, [Name, UserID, Content]);

    conn.release();
    return result[0].insertId;
  } catch (err) {
    console.error("Error in addperfumeDelete:", err); // 추가: 에러 발생 시 에러 메시지 출력
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 코멘트 조회 (로그인 유저)
export const getPreviewperfumeCommentContentUser = async (Name) => {
  try {
    const conn = await pool.getConnection();

    // console.log("Query Parameters:", Name);
    const [perfume_comment_contents_user] = await pool.query(getCommentUserId, Name);
    conn.release();
    return perfume_comment_contents_user;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 코멘트 조회 (비로그인 유저)
export const getPreviewperfumeCommentContent = async (Name) => {
  try {
    const conn = await pool.getConnection();

    // console.log("Query Parameters:", Name);
    const [perfume_comment_contents] = await pool.query(getCommentId, Name);
    conn.release();
    return perfume_comment_contents;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 찜하기
export const changeperfumeLike = async (Name, UserID) => {
  try {
    const conn = await pool.getConnection();
    // console.log("Changing perfumeWrite:", Name, UserID); // 추가: 데이터가 올바르게 전달되는지 확인하기 위한 로그

    const [existingLike] = await pool.query(getPerfumeLikeStatusSql, [UserID, Name]);

    let result;

    if (existingLike.length === 0) {
      // 찜이 없는 경우, 새로운 찜 생성
      result = await pool.query(insertPerfumeLikeSql, [UserID, "A", Name]);
    } else {
      // 찜이 있는 경우, 찜 상태 업데이트 (A -> D, D -> A)
      const newStatus = existingLike[0].Status === "A" ? "D" : "A";
      result = await pool.query(updatePerfumeLikeSql, [newStatus, UserID, Name]);
    }

    conn.release();
    return result[0].insertId;
  } catch (err) {
    console.error("Error in changeperfumeLike:", err); // 추가: 에러 발생 시 에러 메시지 출력
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};
