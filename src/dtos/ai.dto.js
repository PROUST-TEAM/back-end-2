// 향수 검색 결과
export const perfumeSearchResultResponseDTO = (result) => {
    const perfumes = result.perfumes;
    const categories = result.categories;
    // console.log("dto1:", perfumes, categories);
    const perfume_contents = [];

    for (let i = 0; i < perfumes.length; i++) {
        const perfume = perfumes[i];
        const perfumeCategories = categories.filter(
            (category) => category.PerfumeID === perfume.PerfumeID
        );
        const categoryNames = perfumeCategories.map(
            (category) => category.Keyword
        );

        perfume_contents.push({
            perfumeID : perfume.PerfumeID,
            name: perfume.Name,
            nameKor: perfume.NameKor,
            description: perfume.Description,
            ingredients: perfume.Ingredients,
            brand: perfume.Brand,
            imageUrl: perfume.Image,
            category: categoryNames,
        });
    }
    // console.log("perfume_contents ", perfume_contents);

    return perfume_contents;
};
