import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { addperfumeWriteResponseDTO } from "../dtos/perfume.dto.js";
import { addperfumeWrite, getperfumeWrite, addperfumeDelete, changeperfumeLike } from "../models/perfume.dao.js";

export const joinperfumeWrite = async (Name, UserID, body) => {
  const joinperfumeWriteData = await addperfumeWrite(Name, UserID, {
    Content: body.Content,
  });

  if (joinperfumeWriteData == -1) {
    throw new BaseError(status.COMMENT_ALREADY_EXIST);
  } else {
    return addperfumeWriteResponseDTO(await getperfumeWrite(joinperfumeWriteData));
  }
};

// 향수 코멘트 삭제
export const joinperfumeDelete = async (Name, UserID, Content) => {
  const joinperfumeDeleteData = await addperfumeDelete(Name, UserID, Content);
};

// 향수 찜하기
export const perfumeLikeContent = async (Name, UserID) => {
  const joinperfumeLikeData = await changeperfumeLike(Name, UserID);
};
