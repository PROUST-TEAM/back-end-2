import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

export const searchPerfumeResult = async (searchText) => {
    try {
        const conn = await pool.getConnection();

        const query = `
            SELECT DISTINCT p.*
            FROM Perfume p
            LEFT JOIN PerfumeCategory pc ON p.PerfumeID = pc.PerfumeID
            LEFT JOIN Category c ON pc.CategoryID = c.CategoryID
            WHERE p.Name LIKE ? 
            OR p.NameKor LIKE ? 
            OR p.Brand LIKE ?
            OR c.Keyword LIKE ?`;

        const [perfumes] = await pool.query(query, [
            `%${searchText}%`,
            `%${searchText}%`,
            `%${searchText}%`,
            `%${searchText}%`,
        ]);

        // 각 향수에 대한 카테고리 정보도 가져옴
        const categoryQuery = `
            SELECT pc.PerfumeID, c.Keyword
            FROM PerfumeCategory pc
            LEFT JOIN Category c ON pc.CategoryID = c.CategoryID
            WHERE pc.PerfumeID IN (?)`;
        const [categories] = await pool.query(categoryQuery, [
            perfumes.map((perfume) => perfume.PerfumeID),
        ]);

        conn.release();

        const result = {
            perfumes: perfumes,
            categories: categories,
        };

        // console.log(result);

        // 향수와 카테고리 정보를 DTO에 전달하여 반환
        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};
