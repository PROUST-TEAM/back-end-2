import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { addperfumeWriteResponseDTO } from "../dtos/perfume.dto.js";
import { addperfumeWrite, getperfumeWrite } from "../models/perfume.dao.js";

// 향수 코멘트 작성
export const joinperfumeWrite = async (PerfumeID, UserID, body) => {
  console.log(PerfumeID, UserID);

  const joinperfumeWriteData = await addperfumeWrite(PerfumeID, UserID, {
    // PerfumeID: PerfumeID,
    // UserID: UserID,
    Content: body.Content,
  });

  return addperfumeWriteResponseDTO(await getperfumeWrite(joinperfumeWriteData));
};
