import { previewperfumeContentResponseDTO, previewcategoryContentResponseDTO, previewperfumeCommentContentUserResponseDTO, previewperfumeCommentContentResponseDTO } from "../dtos/perfume.dto.js";
import { getPreviewperfumeContent, getPreviewcategoryContent, getPreviewperfumeCommentContentUser, getPreviewperfumeCommentContent } from "../models/perfume.dao.js";

export const perfumeContent = async (Name) => {
  // console.log(PerfumeID);
  return previewperfumeContentResponseDTO(await getPreviewperfumeContent(Name));
};

export const categoryContent = async (Name) => {
  // console.log(PerfumeID);
  return previewcategoryContentResponseDTO(await getPreviewcategoryContent(Name));
};

export const perfumeCommentContentUser = async (Name) => {
  // console.log(PerfumeID);

  return previewperfumeCommentContentUserResponseDTO(await getPreviewperfumeCommentContentUser(Name));
};

export const perfumeCommentContent = async (Name) => {
  // console.log(PerfumeID);

  return previewperfumeCommentContentResponseDTO(await getPreviewperfumeCommentContent(Name));
};
