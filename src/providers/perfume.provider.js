import { previewperfumeContentResponseDTO } from "../dtos/perfume.dto.js";
import { getPreviewperfumeContent } from "../models/perfume.dao.js";

export const perfumeContent = async (PerfumeID) => {
  // console.log(PerfumeID);
  return previewperfumeContentResponseDTO(await getPreviewperfumeContent(PerfumeID));
};
