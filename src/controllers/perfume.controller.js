import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { perfumeContent, categoryContent, perfumeCommentContentUser, perfumeCommentContent } from "../providers/perfume.provider.js";
import { joinperfumeWrite, joinperfumeDelete } from "../services/perfume.service.js";

export const perfumePreview = async (req, res, next) => {
  console.log("향수 상세 정보 조회를 요청하였습니다!");
  //   console.log(req.params.PerfumeID);

  return res.send(response(status.SUCCESS, await perfumeContent(req.params.PerfumeID)));
};

export const categoryPreview = async (req, res, next) => {
  console.log("향수 카테고리 정보 조회를 요청하였습니다!");
  //   console.log(req.params.PerfumeID);

  return res.send(response(status.SUCCESS, await categoryContent(req.params.PerfumeID)));
};

export const perfumeWrite = async (req, res, next) => {
  console.log("향수 코멘트 작성을 요청하였습니다!");

  // console.log(req.params.PerfumeID);
  // console.log(req.params.UserID);
  // console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

  res.send(response(status.SUCCESS, await joinperfumeWrite(req.params.PerfumeID, req.params.UserID, req.body)));
};

export const perfumeDelete = async (req, res, next) => {
  console.log("향수 코멘트 삭제를 요청하였습니다!");

  // console.log(req.params.PerfumeID);
  // console.log(req.params.UserID);
  // console.log(req.params.CommentID);

  res.send(response(status.SUCCESS, await joinperfumeDelete(req.params.PerfumeID, req.params.UserID, req.params.CommentID)));
};

export const perfumeReadUser = async (req, res, next) => {
  console.log("향수 코멘트 조회(로그인 유저)를 요청하였습니다!");

  console.log(req.params.PerfumeID);

  return res.send(response(status.SUCCESS, await perfumeCommentContentUser(req.params.PerfumeID)));
};

export const perfumeRead = async (req, res, next) => {
  console.log("향수 코멘트 조회(비로그인 유저)를 요청하였습니다!");

  console.log(req.params.PerfumeID);

  return res.send(response(status.SUCCESS, await perfumeCommentContent(req.params.PerfumeID)));
};
