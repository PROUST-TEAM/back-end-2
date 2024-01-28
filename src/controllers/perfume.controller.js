import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { perfumeContent } from "../providers/perfume.provider.js";

export const perfumePreview = async (req, res, next) => {
  console.log("향수 상세 정보 조회를 요청하였습니다!");
  //   console.log(req.params.PerfumeID);

  return res.send(response(status.SUCCESS, await perfumeContent(req.params.PerfumeID)));
};
