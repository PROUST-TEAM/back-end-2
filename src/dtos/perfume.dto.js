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
  if (perfumeWrite && perfumeWrite.length > 0) {
    return { Content: perfumeWrite[0].Content };
  } else {
    // 적절한 오류 처리를 추가하세요
    return { Error: "No data found" };
  }
};

// 향수 코멘트 삭제
// export const addperfumeDeleteResponseDTO = (perfumeWrite) => {
//   return { Content: perfumeWrite[0].Content };
// };

// 향수 코멘트 조회 (로그인 유저)
export const previewperfumeCommentContentUserResponseDTO = (data) => {
  const perfume_comment_contents_user = [];

  for (let i = 0; i < data.length; i++) {
    perfume_comment_contents_user.push({
      Content: data[i].Content,
    });
  }

  console.log(perfume_comment_contents_user);
  return { perfume_comment_contents_userData: perfume_comment_contents_user };
};

// 향수 코멘트 조회 (비로그인 유저)
export const previewperfumeCommentContentResponseDTO = (data) => {
  const perfume_comment_contents = [];

  for (let i = 0; i < data.length; i++) {
    perfume_comment_contents.push({
      Content: data[i].Content,
    });
  }

  console.log(perfume_comment_contents);
  return { perfume_comment_contentsData: perfume_comment_contents };
};

// 향수 찜하기
export const changeperfumeLikeResponseDTO = (perfumeLike) => {
  return { Status: perfumeLike[0].Status };
};
