import { previewperfumeContentResponseDTO, previewcategoryContentResponseDTO } from "../dtos/perfume.dto.js";
import { getPreviewperfumeContent, getPreviewcategoryContent } from "../models/perfume.dao.js";

export const perfumeContent = async (PerfumeID) => {
  // console.log(PerfumeID);
  return previewperfumeContentResponseDTO(await getPreviewperfumeContent(PerfumeID));
};

export const categoryContent = async (PerfumeID) => {
  // console.log(PerfumeID);
  return previewcategoryContentResponseDTO(await getPreviewcategoryContent(PerfumeID));
};
