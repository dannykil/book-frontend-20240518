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
  // const { username } = useParams();
  const location = useLocation();
  // const navigate = useNavigate();
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

  const filtering = () => {
    // const result = []; // const로 선언하면 오류남(Assignment to constant variable.)
    let result = [];
    // let result = null;
    if (categoryList !== null && search.categoryName !== null) {
      console.log('filtering(categoryList) : ', categoryList);

      // result = categoryList.categories
      result = categoryList
        .filter((category) =>
          category.categoryName.includes(search.categoryName),
        )
        .map((category) => (
          <CategoryItem key={category.id} category={category} />
        ));

      console.log('filtering(result) : ', result);
    }
    return result;
  };

  // const onRead = (id) => {
  //   navigate(`/settings/category/` + id);
  // };

  // console.log('CategoryListContainer.js > loading : ', { loading });
  console.log('CategoryListContainer.js > loading : ', loading);
  // console.log(categoryList);
  console.log('Out of useEffect : ', categoryList);
  useEffect(() => {
    console.log('In useEffect start : ', categoryList);
    // console.log('CategoryListContainer.js > loading : ', loading);
    // if (loading) {
    //   console.log('CategoryListContainer.js > loading : ', loading);
    //   return null;
    // }
    // dispatch(listCategory({ tag, username, page }));
    // const { page } = qs.parse(location.search, {
    //   ignoreQueryPrefix: true,
    // });
    // dispatch(categoryListAction(page));
    dispatch(categoryListAction());
    // console.log(categoryList);
    // dispatch(changeMenuAction('category', categoryList));
    console.log('In useEffect end : ', categoryList);
  }, []);

  return (
    <>
      <CategoryHeader
        categories={categoryList}
        loading={loading}
        // onCancle={onCancle}
        // onPublish={onPublish}
        filtering={filtering()}
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
