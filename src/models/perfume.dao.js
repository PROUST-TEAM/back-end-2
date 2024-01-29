import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getPerfumeId, getcategoryId } from "./perfume.sql.js";

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
