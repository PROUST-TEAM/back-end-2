// 향수 상세 정보 조회

export const getPerfumeId = "SELECT p.Name, p.NameKor, p.Description, p.Image " + "FROM perfume p " + "WHERE p.PerfumeId = ? ;";

// 향수 카테고리 정보 조회

export const getcategoryId = "SELECT c.Keyword " + "FROM perfumecategory pc JOIN perfume p ON pc.PerfumeId = p.PerfumeId JOIN category c ON pc.CategoryID = c.CategoryID " + "WHERE pc.PerfumeId = ? ;";
