import { searchPerfumeResult } from "../models/ai.dao.js";
import { perfumeResultResponseDTO } from "../dtos/ai.dto.js";
import OpenAI from "openai";
import { getUserLikes, getAllPerfumes } from "../models/ai.dao.js";
import mecab from "mecab-ya";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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

    const userLikesDescription = userLikesResult.perfumes.map(
        (perfume) => perfume.Description
    );
    // console.log(userLikesDescription.join(" "));

    const userLikesEmbedding = await textEmbedding(userLikesDescription);
    console.log(userLikesEmbedding);

    // 전체 향수 데이터베이스
    // const allPerfumesResult = perfumeResultResponseDTO(
    //     await getAllPerfumes()
    // ).slice(0, 2);
    const allPerfumesResult = await getAllPerfumes();
    console.log(allPerfumesResult);

    // 전체 향수의 설명
    const allPerfumesDescription = allPerfumesResult.perfumes.map(
        (perfume) => perfume.Description
    );
    // console.log(allPerfumesDescription);
    const allPerfumesEmbedding = await textEmbedding(allPerfumesDescription);
    // console.log(allPerfumesEmbedding);

    const similarities = [];
    for (let i = 0; i < userLikesEmbedding.length; i++) {
        for (let j = 0; j < allPerfumesEmbedding.length; j++) {
            if (
                !likedPerfumeIds.includes(
                    allPerfumesResult.perfumes[j].PerfumeID
                )
            ) {
                const similarity = calculateCosineSimilarity(
                    userLikesEmbedding[i].embedding,
                    allPerfumesEmbedding[j].embedding
                );
                similarities.push({ perfumeIndex: j, similarity });
            }
        }
    }

    const recommendedPerfumeIndices = similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3)
        .map((item) => item.perfumeIndex);
    console.log(recommendedPerfumeIndices);

    // 추천된 향수 가져오기
    const recommendedPerfumes = recommendedPerfumeIndices.map(
        (index) => allPerfumesResult.perfumes[index]
    );

    return recommendedPerfumes;
};
