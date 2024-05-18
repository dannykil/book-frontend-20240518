import React from 'react';
import CategoryItem from './CategoryItem';

// console.log('CategoryListPage.js > CategoryListContainer.js > CategoryList.js');
const CategoryList = ({ categories, onRead, loading, pagination, search }) => {
  console.log(
    'CategoryListPage.js > CategoryListContainer.js > CategoryList.js',
  );
  // console.log('search.categoryName : ', search.categoryName);

  if (loading) {
    console.log('CategoryList.js > loading : ', loading);
    return null;
  }

  // const filtering = () => {
  //   const result = [];
  //   for (let i = pagination.startPage; i <= pagination.endPage; i++) {
  //     if (pagination.currentPage === i) {
  //       result.push(<CategoryItem key={category.id} category={category} />);
  //     }
  //   }
  //   return result;
  // };

  return (
    <>
      {!loading && categories && (
        <div>
          {categories
            .filter(
              (category, i) =>
                i + 1 >= pagination.startPage && i + 1 <= pagination.endPage,
              // category.categoryName.includes(search.categoryName),
            )
            .map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                // onRead={onRead}
              />
            ))}
        </div>
      )}
    </>
  );
};

// React.memo(): 렌더링 결과를 메모이징(Memoizing)함으로써 불필요한 리렌더링을 건너뛴다.
// 여기서는 로그상 변화가 없음 or 변화가 있었나? >>> CategoryList는 있을듯.
// export default React.memo(CategoryList);
export default CategoryList;
