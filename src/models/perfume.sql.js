// 향수 상세 정보 조회

export const getPerfumeId = "SELECT p.Name, p.NameKor, p.Description, p.Image " + "FROM perfume p " + "WHERE p.PerfumeId = ? ;";
