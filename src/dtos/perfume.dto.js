// 향수 상세 정보 조회
export const previewperfumeContentResponseDTO = (data) => {
  const perfume_contents = [];

  for (let i = 0; i < data.length; i++) {
    perfume_contents.push({
      name: data[i].Name,
      nameKor: data[i].NameKor,
      description: data[i].Description,
      imageUrl: data[i].Image,
    });
  }

  console.log(perfume_contents);
  return { perfume_contentsData: perfume_contents };
};

// 향수 카테고리 정보 조회
export const previewcategoryContentResponseDTO = (data) => {
  const category_contents = [];

  for (let i = 0; i < data.length; i++) {
    category_contents.push({
      keyword: data[i].Keyword,
    });
  }

  console.log(category_contents);
  return { category_contentsData: category_contents };
};

// 향수 코멘트 작성
export const addperfumeWriteResponseDTO = (perfumeWrite) => {
  return { Content: perfumeWrite[0].Content };
};

// 향수 코멘트 삭제
// export const addperfumeDeleteResponseDTO = (perfumeWrite) => {
//   return { Content: perfumeWrite[0].Content };
// };
