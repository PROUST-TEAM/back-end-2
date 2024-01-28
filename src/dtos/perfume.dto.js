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
