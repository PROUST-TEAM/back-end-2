import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { addperfumeWriteResponseDTO } from "../dtos/perfume.dto.js";
import { addperfumeWrite, getperfumeWrite, addperfumeDelete, changeperfumeLike } from "../models/perfume.dao.js";

// 향수 코멘트 작성
export const joinperfumeWrite = async (PerfumeID, UserID, body) => {
  // console.log(PerfumeID, UserID);

  const joinperfumeWriteData = await addperfumeWrite(PerfumeID, UserID, {
    // PerfumeID: PerfumeID,
    // UserID: UserID,
    Content: body.Content,
  });

  return addperfumeWriteResponseDTO(await getperfumeWrite(joinperfumeWriteData));
};

// 향수 코멘트 삭제
export const joinperfumeDelete = async (PerfumeID, UserID, CommentID) => {
  console.log(PerfumeID, UserID, CommentID);

  const joinperfumeDeleteData = await addperfumeDelete(PerfumeID, UserID, CommentID);

  // return addperfumeDeleteResponseDTO(await getperfumeDelete(joinperfumeDeleteData));
};

// 향수 찜하기
export const perfumeLikeContent = async (PerfumeID, UserID) => {
  // console.log(PerfumeID, UserID);

  const joinperfumeLikeData = await changeperfumeLike(PerfumeID, UserID);

  // return changeperfumeLikeResponseDTO(await getperfumeLike(joinperfumeLikeData));
};
