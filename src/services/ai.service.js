import { searchPerfumeResult } from "../models/ai.dao.js";
import { perfumeSearchResultResponseDTO } from "../dtos/ai.dto.js";

export const searchPerfume = async (searchText) => {
    const result = await searchPerfumeResult(searchText);
    // console.log("searchresult", result);
    return perfumeSearchResultResponseDTO(result);
};
