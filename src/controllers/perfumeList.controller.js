import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { perfumeListContent } from "../providers/perfumeList.provider.js";

export const perfumeList = async (req, res, next) => {
  console.log("취'향'목록 조회를 요청하였습니다!");
  //   console.log(req.params.Keyword, req.params.UserID);

  let { Keyword } = req.query;

  // Keyword가 존재하지 않는 경우에만 undefined로 설정
  if (!Keyword) {
    Keyword = undefined;
  } else {
    // Keyword가 존재하는 경우 처리
    Keyword = Array.isArray(Keyword) ? Keyword : [Keyword];

    // 각 키워드 디코딩 및 문자열 처리
    Keyword = Keyword.map((keyword) => keyword.replace(/'/g, ""));
    Keyword = Keyword.map((keyword) => keyword.replace(/\[/g, ""));
    Keyword = Keyword.map((keyword) => keyword.replace(/\]/g, ""));
    Keyword = Keyword.map((keyword) => decodeURIComponent(keyword));

    // 문자열을 쉼표를 기준으로 분할하여 배열로 변환
    Keyword = Keyword.join(",")
      .split(",")
      .map((keyword) => keyword.trim());
  }

  console.log(Keyword);

  return res.send(response(status.SUCCESS, await perfumeListContent(req.params.UserID, Keyword)));
};
