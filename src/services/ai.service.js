import { searchPerfumeResult } from "../models/ai.dao.js";
import { perfumeResultResponseDTO } from "../dtos/ai.dto.js";
import OpenAI from "openai";
import { getUserLikes, getAllPerfumes } from "../models/ai.dao.js";

export const searchPerfume = async (searchText) => {
    const result = await searchPerfumeResult(searchText);
    // console.log("searchresult", result);
    return perfumeResultResponseDTO(result);
};

// 코사인 유사도 계산 함수
function cosineSimilarity(vecA, vecB) {
    // 벡터의 내적 계산
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);

    // 각 벡터의 크기 계산
    const magnitudeA = Math.sqrt(
        vecA.reduce((acc, val) => acc + Math.pow(val, 2), 0)
    );
    const magnitudeB = Math.sqrt(
        vecB.reduce((acc, val) => acc + Math.pow(val, 2), 0)
    );

    // 코사인 유사도 계산
    return dotProduct / (magnitudeA * magnitudeB);
}

export const recommendPerfumeUser = async (userId) => {
    // 사용자가 좋아하는 향수 가져오기
    const result = await getUserLikes(userId);

    // 사용자가 좋아하는 향수가 없을 경우 예외 처리
    if (!result || result.length === 0) {
        throw new Error("사용자가 좋아하는 향수가 없습니다.");
    }

    // 사용자가 찜한 향수 ID 배열
    const likedPerfumeIds = result.perfumes.map((perfume) => perfume.PerfumeID);

    // 새로운 향수를 찜한 경우 해당 향수 ID를 추가
    if (result.newlyLikedPerfumeId) {
        likedPerfumeIds.push(result.newlyLikedPerfumeId);
    }

    // 사용자가 좋아하는 향수의 설명 가져오기
    const userLikes = result.perfumes.map((perfume) => perfume.Description);

    // 전체 향수 데이터베이스 가져오기
    const allPerfumesResult = await getAllPerfumes();
    const allPerfumes = allPerfumesResult.perfumes.map(
        (perfume) => perfume.Description
    );

    // 사용자가 좋아하는 향수의 벡터 생성
    const userLikesVector = userLikes.map((description) => {
        const tokens = description.split(" ");
        return allPerfumes.map((perfumeDescription) =>
            tokens.some((token) => perfumeDescription.includes(token)) ? 1 : 0
        );
    });

    // 전체 향수 데이터베이스의 벡터 생성
    const allPerfumesVector = allPerfumes.map((perfumeDescription) => {
        const tokens = perfumeDescription.split(" ");
        return userLikes.map((userLike) =>
            tokens.some((token) => userLike.includes(token)) ? 1 : 0
        );
    });

    // 각 향수 간의 코사인 유사도 계산
    const similarities = allPerfumesVector.map(
        (perfumeVector) => cosineSimilarity(userLikesVector[0], perfumeVector) // 첫 번째 사용자가 좋아하는 향수와의 유사도 계산
    );

    // 코사인 유사도를 기준으로 향수 정렬 및 사용자가 이미 찜한 향수 제외
    const recommendedPerfumeIndices = similarities
        .map((similarity, index) => ({ index, similarity }))
        .sort((a, b) => b.similarity - a.similarity) // 내림차순 정렬
        .filter(
            (item) =>
                !likedPerfumeIds.includes(
                    allPerfumesResult.perfumes[item.index].PerfumeID
                )
        ) // 이미 사용자가 찜한 향수 제외
        .slice(0, 3) // 가장 유사한 향수 3개 추출
        .map((item) => item.index);

    // 추천된 향수 가져오기
    const recommendedPerfumes = recommendedPerfumeIndices.map(
        (index) => allPerfumesResult.perfumes[index]
    );

    return recommendedPerfumes;
};

export const recommendPerfume = async (search) => {
    const result = await getAllPerfumes();
    const allPerfumes = JSON.stringify(
        perfumeResultResponseDTO(result).slice(0, 7)
    ); // 글자수가 길어서 전체 데이터를 못보내
    // const like_content = likeContent();
    console.log(allPerfumes);
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "취'향'을 찾아봐" },
            {
                role: "user",
                content: `${allPerfumes} 리스트에서 ${search} 관련 향수 3개가지  추천해줘`,
            },
        ],
        model: "gpt-3.5-turbo",
    });
    // console.log(chatCompletion.choices[0].message);
    return chatCompletion.choices[0].message;
};
