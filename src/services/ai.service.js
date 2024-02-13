import { searchPerfumeResult } from "../models/ai.dao.js";
import { perfumeResultResponseDTO } from "../dtos/ai.dto.js";
import OpenAI from "openai";
import { getUserLikes, getAllPerfumes } from "../models/ai.dao.js";

export const searchPerfume = async (searchText) => {
    const result = await searchPerfumeResult(searchText);
    console.log("reseult" + result.length);
    if (Object.keys(result).length !== 0) {
        return perfumeResultResponseDTO(result);
    } else {
        const result2 = await getAllPerfumes();
        // console.log("reseult2" + result2);
        const allPerfumes = JSON.stringify(perfumeResultResponseDTO(result2));
        // const like_content = likeContent();
        // console.log(allPerfumes);
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const chatCompletion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "취'향'을 찾아봐" },
                {
                    role: "user",
                    content: `${allPerfumes} 리스트에서 ${searchText} 관련 향수 3개까지 추천해주고 리스트의 DTO 객체 형태로만 반환해줘`,
                },
            ],
            model: "gpt-4-turbo-preview",
            temperature: 0.5, // 낮은 값으로 설정하여 일관된 결과를 얻을 수 있습니다.
            seed: 12345, // 임의의 값으로 설정하여 결과의 재현성을 보장합니다.
        });

        const aiResult = chatCompletion.choices[0].message.content;
        console.log("result" + aiResult);

        // JSON 형식의 문자열 추출
        // const jsonStartIndex = aiResult.indexOf("```json") + 6; // '```json' 다음 문자부터 시작
        // const jsonEndIndex = aiResult.lastIndexOf("```"); // 마지막 '```' 위치까지
        // const jsonString = aiResult.substring(jsonStartIndex, jsonEndIndex);
        // console.log(jsonString);

        // "```json"과 "```" 사이의 문자열 추출
        var jsonText = aiResult.match(/```json([\s\S]*)```/)[1];
        console.log(jsonText);

        // JSON 문자열을 파싱하여 객체 배열로 변환
        const perfumeArray = JSON.parse(jsonText);

        return perfumeArray;
    }
    // console.log("searchresult", result);
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
