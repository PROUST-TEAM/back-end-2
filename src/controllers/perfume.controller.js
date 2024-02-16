import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { perfumeContent, categoryContent, likeContent, perfumeCommentContentUser, perfumeCommentContent } from "../providers/perfume.provider.js";
import { joinperfumeWrite, joinperfumeDelete, perfumeLikeContent } from "../services/perfume.service.js";

export const perfumePreview = async (req, res, next) => {
  console.log("향수 상세 정보 조회를 요청하였습니다!");

  return res.send(response(status.SUCCESS, await perfumeContent(req.params.Name)));
};

export const categoryPreview = async (req, res, next) => {
  console.log("향수 카테고리 정보 조회를 요청하였습니다!");

  return res.send(response(status.SUCCESS, await categoryContent(req.params.Name)));
};

export const likePreview = async (req, res, next) => {
  console.log("향수 찜 정보 조회를 요청하였습니다!");

  return res.send(response(status.SUCCESS, await likeContent(req.params.Name, req.userId)));
};

export const perfumeWrite = async (req, res, next) => {
  console.log("향수 코멘트 작성을 요청하였습니다!");

  const content = req.body.Content;

  // Content가 숫자나 특수 기호로만 이루어져 있는지 확인
  if (!isValidText(content)) {
    return res.status(400).send("숫자나 특수 기호로만 작성할 수 없습니다.");
  }

  res.send(response(status.SUCCESS, await joinperfumeWrite(req.params.Name, req.userId, req.body)));
};

const isValidText = (text) => {
  // 텍스트가 아닌 경우 false 반환
  if (typeof text !== "string" || text.trim() === "") {
    return false;
  }

  // 숫자로만 이루어진 경우 false 반환
  if (/^\d+$/.test(text)) {
    return false;
  }

  // 특수 기호로만 이루어진 경우 false 반환
  if (/^[!@#$%^&*(),.?":{}|<>]+$/.test(text)) {
    return false;
  }

  // 모든 조건을 만족하지 않는 경우 true 반환
  return true;
};

export const perfumeDelete = async (req, res, next) => {
  console.log("향수 코멘트 삭제를 요청하였습니다!");

  res.send(response(status.SUCCESS, await joinperfumeDelete(req.params.Name, req.userId, req.params.Content)));
};

export const perfumeReadUser = async (req, res, next) => {
  console.log("향수 코멘트 조회(로그인 유저)를 요청하였습니다!");

  return res.send(response(status.SUCCESS, await perfumeCommentContentUser(req.params.Name)));
};

export const perfumeRead = async (req, res, next) => {
  console.log("향수 코멘트 조회(비로그인 유저)를 요청하였습니다!");

  return res.send(response(status.SUCCESS, await perfumeCommentContent(req.params.Name)));
};

export const perfumeLike = async (req, res, next) => {
  console.log("향수 찜하기 요청하였습니다!");

  return res.send(response(status.SUCCESS, await perfumeLikeContent(req.params.Name, req.userId)));
};
