// 취'향'목록 조회
export const previewperfumeListResponseDTO = (data) => {
  console.log(data);
  console.log("----------");
  const perfumeList_contents = [];

  // 중복을 제거하기 위한 임시 객체
  const perfumeMap = {};

  for (let i = 0; i < data.length; i++) {
    const name = data[i].Name;
    const keyword = data[i].Keyword;

    // 이미 해당 이름의 향수가 추가되었는지 확인
    if (!perfumeMap[name]) {
      // 향수가 추가되지 않았다면 임시 객체에 추가하고 향수 정보를 배열로 초기화
      perfumeMap[name] = {
        name: name,
        imageUrl: data[i].Image,
        status: data[i].Status,
        keywords: [keyword], // 향수의 향을 배열로 저장
      };
    } else {
      // 이미 해당 이름의 향수가 추가되었다면 향수 정보의 향 배열에 향을 추가
      perfumeMap[name].keywords.push(keyword);
    }
  }

  // 임시 객체의 값들을 결과 배열에 복사
  for (const name in perfumeMap) {
    perfumeList_contents.push(perfumeMap[name]);
  }

  console.log(perfumeList_contents);
  return { perfumeList_contentsData: perfumeList_contents };
};
