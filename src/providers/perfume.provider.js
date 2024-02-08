import { previewperfumeContentResponseDTO, previewcategoryContentResponseDTO, previewlikeContentResponseDTO, previewperfumeCommentContentUserResponseDTO, previewperfumeCommentContentResponseDTO } from "../dtos/perfume.dto.js";
import { getPreviewperfumeContent, getPreviewcategoryContent, getPreviewlikeContent, getPreviewperfumeCommentContentUser, getPreviewperfumeCommentContent } from "../models/perfume.dao.js";

export const perfumeContent = async (Name) => {
  // console.log(PerfumeID);
  return previewperfumeContentResponseDTO(await getPreviewperfumeContent(Name));
};

export const categoryContent = async (Name) => {
  // console.log(PerfumeID);
  return previewcategoryContentResponseDTO(await getPreviewcategoryContent(Name));
};

export const likeContent = async (Name, UserID) => {
  // console.log(PerfumeID);
  return previewlikeContentResponseDTO(await getPreviewlikeContent(Name, UserID));
};

export const perfumeCommentContentUser = async (Name) => {
  // console.log(PerfumeID);

  return previewperfumeCommentContentUserResponseDTO(await getPreviewperfumeCommentContentUser(Name));
};

export const perfumeCommentContent = async (Name) => {
  // console.log(PerfumeID);

  return previewperfumeCommentContentResponseDTO(await getPreviewperfumeCommentContent(Name));
};
