import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {
    perfumeResultResponseDTO,
    perfumeSearchResponseDTO,
} from "../dtos/ai.dto.js";

export const searchPerfumeResult = async (searchText) => {
    try {
        const conn = await pool.getConnection();

        let perfumes = [];
        // if (userId === null) {
        const query = `
                SELECT DISTINCT p.*, null AS Status
                FROM Perfume p
                LEFT JOIN PerfumeCategory pc ON p.PerfumeID = pc.PerfumeID
                LEFT JOIN Category c ON pc.CategoryID = c.CategoryID
                WHERE p.Name LIKE ?
                OR p.NameKor LIKE ?
                OR p.Brand LIKE ?
                OR c.Keyword LIKE ?`;
        [perfumes] = await pool.query(query, [
            `%${searchText}%`,
            `%${searchText}%`,
            `%${searchText}%`,
            `%${searchText}%`,
        ]);
        // } else {
        //     query = `
        //     SELECT DISTINCT p.*, up.Status
        //     FROM Perfume p
        //     LEFT JOIN PerfumeCategory pc ON p.PerfumeID = pc.PerfumeID
        //     LEFT JOIN Category c ON pc.CategoryID = c.CategoryID
        //     LEFT JOIN UserPerfume up ON p.PerfumeID = up.PerfumeID AND up.UserID = ?
        //     WHERE p.Name LIKE ?
        //     OR p.NameKor LIKE ?
        //     OR p.Brand LIKE ?
        //     OR c.Keyword LIKE ?`;
        //     [perfumes] = await pool.query(query, [
        //         userId,
        //         `%${searchText}%`,
        //         `%${searchText}%`,
        //         `%${searchText}%`,
        //         `%${searchText}%`,
        //     ]);
        // }

        // console.log(perfumes);

        let result = {};

        if (perfumes.length !== 0) {
            // 각 향수에 대한 카테고리 정보도 가져옴
            const categoryQuery = `
                SELECT pc.PerfumeID, c.Keyword
                FROM PerfumeCategory pc
                LEFT JOIN Category c ON pc.CategoryID = c.CategoryID
                WHERE pc.PerfumeID IN (?)`;
            const [categories] = await pool.query(categoryQuery, [
                perfumes.map((perfume) => perfume.PerfumeID),
            ]);
            result = {
                perfumes: perfumes,
                categories: categories,
            };
        }

        conn.release();

        // console.log(result);

        // 향수와 카테고리 정보를 DTO에 전달하여 반환
        return result;
    } catch (err) {
        console.log(err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

// export const getAllPerfumesSearch = async (userId) => {
//     try {
//         const conn = await pool.getConnection();

//         const query = `
//             SELECT p.*, up.Status
//             FROM Perfume p
//             LEFT JOIN UserPerfume up ON p.PerfumeID = up.PerfumeID AND up.UserID = ?`;
//         const [allPerfumes] = await pool.query(query, userId);
//         // console.log(allPerfumes);

//         const categoryQuery = `
//             SELECT pc.PerfumeID, c.Keyword
//             FROM PerfumeCategory pc
//             LEFT JOIN Category c ON pc.CategoryID = c.CategoryID
//             WHERE pc.PerfumeID IN (?)`;

//         const [categories] = await pool.query(categoryQuery, [
//             allPerfumes.map((perfume) => perfume.PerfumeID),
//         ]);
//         const result = {
//             perfumes: allPerfumes,
//             categories: categories,
//         };
//         // console.log(result);

//         conn.release();

//         // console.log("dao" + JSON.stringify(perfumeResultResponseDTO(result)));

//         return perfumeResultResponseDTO(result);
//     } catch (err) {
//         throw new BaseError(status.PARAMETER_IS_WRONG);
//     }
// };

export const getUserLikes = async (userId) => {
    try {
        // console.log(userId);
        const conn = await pool.getConnection();
        // const query = `SELECT PerfumeID FROM UserPerfume WHERE UserID = ?`;

        const query = `
        SELECT Perfume.*
        FROM Perfume
        INNER JOIN UserPerfume ON Perfume.PerfumeID = UserPerfume.PerfumeID
        WHERE UserPerfume.UserID = ? AND UserPerfume.Status = 'A'
    `;

        // const query = `
        //     SELECT Perfume.*, Category.Keyword AS CategoryKeyword
        //     FROM Perfume
        //     INNER JOIN UserPerfume ON Perfume.PerfumeID = UserPerfume.PerfumeID
        //     INNER JOIN PerfumeCategory ON Perfume.PerfumeID = PerfumeCategory.PerfumeID
        //     INNER JOIN Category ON PerfumeCategory.CategoryID = Category.CategoryID
        //     WHERE UserPerfume.UserID = ?
        // `;

        const [userLikes] = await pool.query(query, [userId]);
        // console.log(userLikes);

        let result = {};

        // console.log(userLikes);
        if (userLikes.length !== 0) {
            // 각 향수에 대한 카테고리 정보도 가져옴
            const categoryQuery = `
                SELECT pc.PerfumeID, c.Keyword
                FROM PerfumeCategory pc
                LEFT JOIN Category c ON pc.CategoryID = c.CategoryID
                WHERE pc.PerfumeID IN (?)`;

            const [categories] = await pool.query(categoryQuery, [
                userLikes.map((perfume) => perfume.PerfumeID),
            ]);
            // console.log(categories);
            result = {
                perfumes: userLikes,
                categories: categories,
            };
        }

        conn.release();

        return result;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};

export const getAllPerfumes = async () => {
    try {
        const conn = await pool.getConnection();

        const query = `
        SELECT * FROM Perfume`;
        const [allPerfumes] = await pool.query(query);
        // console.log(allPerfumes);

        const categoryQuery = `
            SELECT pc.PerfumeID, c.Keyword
            FROM PerfumeCategory pc
            LEFT JOIN Category c ON pc.CategoryID = c.CategoryID
            WHERE pc.PerfumeID IN (?)`;

        const [categories] = await pool.query(categoryQuery, [
            allPerfumes.map((perfume) => perfume.PerfumeID),
        ]);
        const result = {
            perfumes: allPerfumes,
            categories: categories,
        };
        // console.log(result);

        conn.release();

        // console.log("dao" + JSON.stringify(perfumeResultResponseDTO(result)));

        return perfumeResultResponseDTO(result);
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};
