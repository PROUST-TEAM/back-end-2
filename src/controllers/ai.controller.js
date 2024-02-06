import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { searchPerfume } from "../services/ai.service.js";

export const Search = async (req, res, next) => {
    const searchText = req.body.search;
    const result = await searchPerfume(searchText);
    // console.log("searchText", searchText);
    // console.log("result", result);
    res.status(200).json(
        response({ isSuccess: true, code: 200, message: "검색 성공" }, result)
    );
};

export const Recommend = async (req, res, next) => {
    // const searchText = req.body.searchText;
    // const result = await recommendPerfume(searchText);
    // res.status(200).json(
    //     response({ isSuccess: true, code: 200, message: "추천 성공" }, result)
    // );
};
