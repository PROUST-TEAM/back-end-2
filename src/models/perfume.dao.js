import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getPerfumeId, getcategoryId, getperfumeWriteID, insertperfumeWriteSql } from "./perfume.sql.js";

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
