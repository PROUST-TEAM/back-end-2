import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getPerfumeId, getcategoryId, getperfumeWriteID, insertperfumeWriteSql, insertperfumeDeleteSql, getCommentUserId, getCommentId, insertPerfumeLikeSql, updatePerfumeLikeSql, getPerfumeLikeStatusSql } from "./perfume.sql.js";

// 향수 상세 정보 조회
export const getPreviewperfumeContent = async (PerfumeID) => {
  try {
    const conn = await pool.getConnection();

    // console.log("Query Parameters:", PerfumeID);
    const [perfume_contents] = await pool.query(getPerfumeId, PerfumeID);
    conn.release();
    return perfume_contents;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 카테고리 정보 조회
export const getPreviewcategoryContent = async (PerfumeID) => {
  try {
    const conn = await pool.getConnection();

    // console.log("Query Parameters:", PerfumeID);
    const [category_contents] = await pool.query(getcategoryId, PerfumeID);
    conn.release();
    return category_contents;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 코멘트 데이터 삽입
export const addperfumeWrite = async (PerfumeID, UserID, data) => {
  try {
    const conn = await pool.getConnection();

    console.log("Inserting perfumeWrite:", PerfumeID, UserID, data); // 추가: 데이터가 올바르게 전달되는지 확인하기 위한 로그

    const result = await pool.query(insertperfumeWriteSql, [PerfumeID, UserID, data.Content]);

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
export const addperfumeDelete = async (PerfumeID, UserID, CommentID) => {
  try {
    const conn = await pool.getConnection();

    console.log("Inserting perfumeDelete:", PerfumeID, UserID, CommentID); // 추가: 데이터가 올바르게 전달되는지 확인하기 위한 로그

    const result = await pool.query(insertperfumeDeleteSql, [PerfumeID, UserID, CommentID]);

    conn.release();
    return result[0].insertId;
  } catch (err) {
    console.error("Error in addperfumeDelete:", err); // 추가: 에러 발생 시 에러 메시지 출력
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 코멘트 조회 (로그인 유저)
export const getPreviewperfumeCommentContentUser = async (PerfumeID) => {
  try {
    const conn = await pool.getConnection();

    console.log("Query Parameters:", PerfumeID);
    const [perfume_comment_contents_user] = await pool.query(getCommentUserId, PerfumeID);
    conn.release();
    return perfume_comment_contents_user;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 코멘트 조회 (비로그인 유저)
export const getPreviewperfumeCommentContent = async (PerfumeID) => {
  try {
    const conn = await pool.getConnection();

    console.log("Query Parameters:", PerfumeID);
    const [perfume_comment_contents] = await pool.query(getCommentId, PerfumeID);
    conn.release();
    return perfume_comment_contents;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

// 향수 찜하기
export const changeperfumeLike = async (PerfumeID, UserID) => {
  try {
    const conn = await pool.getConnection();
    // console.log("Changing perfumeWrite:", PerfumeID, UserID); // 추가: 데이터가 올바르게 전달되는지 확인하기 위한 로그

    const [existingLike] = await pool.query(getPerfumeLikeStatusSql, [PerfumeID, UserID]);

    let result;

    if (existingLike.length === 0) {
      // 찜이 없는 경우, 새로운 찜 생성
      result = await pool.query(insertPerfumeLikeSql, [PerfumeID, UserID, "A"]);
    } else {
      // 찜이 있는 경우, 찜 상태 업데이트 (A -> D, D -> A)
      const newStatus = existingLike[0].Status === "A" ? "D" : "A";
      result = await pool.query(updatePerfumeLikeSql, [newStatus, PerfumeID, UserID]);
    }

    conn.release();
    return result[0].insertId;
  } catch (err) {
    console.error("Error in changeperfumeLike:", err); // 추가: 에러 발생 시 에러 메시지 출력
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};
