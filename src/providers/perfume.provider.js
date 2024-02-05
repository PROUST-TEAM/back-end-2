import { previewperfumeContentResponseDTO, previewcategoryContentResponseDTO, previewperfumeCommentContentUserResponseDTO, previewperfumeCommentContentResponseDTO } from "../dtos/perfume.dto.js";
import { getPreviewperfumeContent, getPreviewcategoryContent, getPreviewperfumeCommentContentUser, getPreviewperfumeCommentContent } from "../models/perfume.dao.js";

export const perfumeContent = async (PerfumeID) => {
  // console.log(PerfumeID);
  return previewperfumeContentResponseDTO(await getPreviewperfumeContent(PerfumeID));
};

export const categoryContent = async (PerfumeID) => {
  // console.log(PerfumeID);
  return previewcategoryContentResponseDTO(await getPreviewcategoryContent(PerfumeID));
};

export const perfumeCommentContentUser = async (PerfumeID) => {
  // console.log(PerfumeID);

  return previewperfumeCommentContentUserResponseDTO(await getPreviewperfumeCommentContentUser(PerfumeID));
};

export const perfumeCommentContent = async (PerfumeID) => {
  // console.log(PerfumeID);

  return previewperfumeCommentContentResponseDTO(await getPreviewperfumeCommentContent(PerfumeID));
};
