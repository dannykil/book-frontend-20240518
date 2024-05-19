import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryList from '../../components/category/CategoryList';
import { categoryListAction } from '../../modules/categoryList';
import CategoryHeader from '../../components/category/CategoryHeader';
import Paging from '../../components/layouts/Pagination';
import CategoryItem from '../../components/category/CategoryItem';

// console.log('CategoryListPage.js > CategoryListContainer.js');
const CategoryListContainer = () => {
  console.log('CategoryListPage.js > CategoryListContainer.js');
  const location = useLocation();
  const dispatch = useDispatch();
  const { categoryList, pagination, search, loading, error } = useSelector(
    ({ categoryList, loading, error }) => ({
      categoryList: categoryList.categories, // 스토어에서 데이터 가져오기 위해 선언
      loading: loading['category/LIST_CATEGORY'],
      // loading: loading,
      pagination: categoryList.pagination,
      search: categoryList.search,
      error: categoryList.error,
    }),
  );

  // const filtering = () => {
  //   // const result = []; // const로 선언하면 오류남(Assignment to constant variable.)
  //   let result = [];
  //   // let result = null;
  //   if (categoryList !== null && search.categoryName !== null) {
  //     console.log('CategoryListContainer > search : ', search);
  //     // console.log('filtering(categoryList) : ', categoryList);
  //     // console.log('search.categoryName : ', search.categoryName);
  //     // console.log('CategoryListContainer > categoryList : ', categoryList);
  //     // console.log('category.categoryName.includes : ', category.categoryName);

  //     // result = categoryList.categories
  //     result = categoryList
  //       .filter((category) =>
  //         category.categoryName.includes(search.categoryName),
  //       )
  //       .map((category) => (
  //         <CategoryItem key={category.id} category={category} />
  //       ));

  //     // console.log('filtering(result) : ', result);
  //   }
  //   return result;
  // };

  // console.log('Out of useEffect : ', categoryList);
  useEffect(() => {
    // console.log('In useEffect start : ', categoryList);
    dispatch(categoryListAction());
  }, []);

  return (
    <>
      <CategoryHeader
        categories={categoryList}
        loading={loading}
        // onCancle={onCancle}
        // onPublish={onPublish}
        search={search}
        error={error}
        isList={true}
        isWrite={false}
        isRead={false}
        isEdit={false}
      />
      <CategoryList
        categories={categoryList}
        // onRead={onRead}
        pagination={pagination}
        search={search}
        loading={loading}
      />
      <Paging
        categories={categoryList}
        pagination={pagination}
        search={search}
        loading={loading}
      />
    </>
  );
};

export default CategoryListContainer;
