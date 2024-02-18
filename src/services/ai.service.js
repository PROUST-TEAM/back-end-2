import { searchPerfumeResult } from "../models/ai.dao.js";
import {
    perfumeResultResponseDTO,
    perfumeSearchResponseDTO,
} from "../dtos/ai.dto.js";
import OpenAI from "openai";
import {
    getUserLikes,
    // getAllPerfumesSearch,
    getAllPerfumes,
} from "../models/ai.dao.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const searchPerfume = async (searchText) => {
    try {
        const result = await searchPerfumeResult(
            // userId,
            searchText
            // isLoggined
        );
        console.log("service" + Object.keys(result));
        if (Object.keys(result).length !== 0) {
            return perfumeResultResponseDTO(result);
        } else {
            const result2 = await getAllPerfumes();
            // console.log("reseult2" + result2);
            // const allPerfumes = JSON.stringify(
            //     perfumeResultResponseDTO(result2)
            // );
            const allPerfumes = JSON.stringify(result2);
            // const like_content = likeContent();
            // console.log(allPerfumes);

            const chatCompletion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "취'향'을 찾아봐" },
                    {
                        role: "user",
                        content: `${allPerfumes} 리스트에서 ${searchText} 관련 향수 추천해서 리스트의 DTO 객체 형태로만 반환해줘.
                        `,
                    },
                ],
                model: "gpt-4-turbo-preview",
                temperature: 0.5, // 낮은 값으로 설정하여 일관된 결과를 얻을 수 있습니다.
                seed: 12345, // 임의의 값으로 설정하여 결과의 재현성을 보장합니다.
            });

            const aiResult = chatCompletion.choices[0].message.content;
            console.log("result2 " + aiResult);

            // 응답이 '```json'으로 시작하는지 확인합니다.
            // if (!aiResult.startsWith("```json")) {
            //     throw new BaseError(status.SEARCH_ERR);
            // }

            // "```json"과 "```" 사이의 문자열 추출
            if (
                aiResult.length === 0 ||
                !aiResult.match(/```json([\s\S]*)```/)
            ) {
                throw new BaseError(status.SEARCH_ERR);
            } else {
                var jsonText = aiResult.match(/```json([\s\S]*)```/)[1];
                console.log("result3 " + jsonText);
                // JSON 문자열을 파싱하여 객체 배열로 변환
                const perfumeArray = JSON.parse(jsonText);
                // console.log(perfumeArray.length);
                if (perfumeArray.length === 0) {
                    throw new BaseError(status.SEARCH_ERR);
                } else {
                    return perfumeArray;
                }
            }
        }
    } catch (error) {
        // console.log("error222" + error + "///");
        throw new BaseError(status.SEARCH_ERR);
    }
    // console.log("searchresult", result);
};

// 코사인 유사도 계산 함수
function calculateCosineSimilarity(tfidf1, tfidf2) {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    Object.keys(tfidf1).forEach((word) => {
        dotProduct += tfidf1[word] * (tfidf2[word] || 0);
        magnitude1 += Math.pow(tfidf1[word], 2);
    });

    Object.keys(tfidf2).forEach((word) => {
        magnitude2 += Math.pow(tfidf2[word], 2);
    });

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    return dotProduct / (magnitude1 * magnitude2);
}

async function textEmbedding(text) {
    // console.log(text);
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        // temperature: 0,
        // max_tokens: 100,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
    });

    // console.log(response);
    // console.log(response.data);

    // API 응답에서 추출된 텍스트 가져오기
    const resultText = response.data;
    // console.log(resultText);

    return resultText;
}

// 사용자가 좋아하는 향수 기반으로 향수 추천하기
export const recommendPerfume = async (userId) => {
    // 사용자가 좋아하는 향수 가져오기
    const userLikesResult = await getUserLikes(userId);
    if (Object.keys(userLikesResult).length === 0) {
        return "사용자가 찜한 향수가 없습니다.";
    }
    // console.log(userLikesResult);

    // 사용자가 찜한 향수 ID 배열
    const likedPerfumeIds = userLikesResult.perfumes.map(
        (perfume) => perfume.PerfumeID
    );
    // console.log(likedPerfumeIds);

    const userLikesDescription = userLikesResult.perfumes
        .map((perfume) => perfume.Description)
        .join(", ");
    // console.log("로그1" + userLikesDescription);

    const userLikesEmbedding = await textEmbedding(userLikesDescription);
    // console.log("로그2" + userLikesEmbedding);

    // 전체 향수 데이터베이스
    // const allPerfumesResult = perfumeResultResponseDTO(
    //     await getAllPerfumes()
    // ).slice(0, 2);
    const allPerfumesResult = await getAllPerfumes();
    // console.log(allPerfumesResult);

    // 전체 향수의 설명
    const allPerfumesDescription = allPerfumesResult.map(
        (perfume) => perfume.description
    );
    // console.log("설명" + typeof allPerfumesDescription);
    const allPerfumesEmbedding = await textEmbedding(allPerfumesDescription);
    // console.log(allPerfumesEmbedding);

    const similarities = [];
    for (let i = 0; i < userLikesEmbedding.length; i++) {
        for (let j = 0; j < allPerfumesEmbedding.length; j++) {
            if (!likedPerfumeIds.includes(allPerfumesResult[j].perfumeID)) {
                const similarity = calculateCosineSimilarity(
                    userLikesEmbedding[i].embedding,
                    allPerfumesEmbedding[j].embedding
                );
                similarities.push({ perfumeIndex: j, similarity });
            }
            // console.log("로그4" + i, j);
        }
    }

    const recommendedPerfumeIndices = similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3)
        .map((item) => item.perfumeIndex);
    // console.log("로그3" + recommendedPerfumeIndices);

    // 추천된 향수 가져오기
    const recommendedPerfumes = recommendedPerfumeIndices.map(
        (index) => allPerfumesResult[index]
    );

    return recommendedPerfumes;
};
