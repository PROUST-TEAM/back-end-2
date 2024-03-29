import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

import { searchPerfume, recommendPerfume } from "../services/ai.service.js";

export const Search = async (req, res, next) => {
    const searchText = req.body.search;
    // console.log(searchText);
    const result = await searchPerfume(searchText);
    // console.log("searchText", searchText);
    // console.log("result", result);
    res.status(200).json(
        response({ isSuccess: true, code: 200, message: "검색 성공" }, result)
    );
};

export const Recommend = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader && authHeader.split(" ")[1]; // Bearer 제거
        const decodedToken = jwt.verify(token, "secretsecretsecret");
        const id = decodedToken.userId;
        const user = await User.findById(id);
        const userId = user.UserID;
        const result = await recommendPerfume(userId);

        res.status(200).json(
            response(
                {
                    isSuccess: true,
                    code: 200,
                    message: "로그인 유저 추천 성공",
                },
                result
            )
        );
    } else {
        const result = "회원가입 하고 향수 추천 받아봐!";
        res.status(200).json(
            response(
                {
                    isSuccess: true,
                    code: 200,
                    message: "비로그인 유저 추천 성공",
                },
                result
            )
        );
    }
};
