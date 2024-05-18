import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryInfomation from '../../components/category/CategoryInfomation';
import { useDispatch, useSelector } from 'react-redux';
import {
  categoryReadAction,
  categoryReadUnload,
} from '../../modules/categoryRead';
import CategoryHeader from '../../components/category/CategoryHeader';
import { deleteCategory } from '../../libs/api/category';
import { setOriginalCategory } from '../../modules/categoryWrite';

const CategoryReadContainer = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('CategoryReadContainer');

  const { category, loading, error } = useSelector(
    ({ categoryRead, loading }) => ({
      category: categoryRead.category,
      error: categoryRead.error,
      loading: loading['category/READ_Category'],
    }),
  );

  useEffect(() => {
    // console.log('categoryReadAction : ', categoryId);
    dispatch(categoryReadAction(categoryId));

    return () => {
      // dispatch(categoryReadUnload());
    };
    // }, [dispatch, categoryId]);
  }, [dispatch, categoryId]);

  const onEdit = () => {
    dispatch(setOriginalCategory(category));
    console.log('setOriginalCategory : ', category);
    // navigate('/write');
  };

  const onCancle = () => {
    dispatch(categoryReadUnload());
    navigate(-1);
  };

  const onDelete = async () => {
    console.log('Delete category ID : ', categoryId);
    try {
      await deleteCategory(categoryId);
      dispatch(categoryReadUnload());
      navigate('/settings/category');
    } catch (e) {
      console.log(e);
    }
  };
  // const onDelete = async () => {
  //   console.log('Delete category ID : ', categoryId);
  //   try {
  //     await categoryDeleteAction(categoryId);
  //     navigate('/');
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <>
      <CategoryHeader
        category={category}
        loading={loading}
        onCancle={onCancle}
        onEdit={onEdit}
        // onPublish={onPublish}
        onDelete={onDelete}
        error={error}
        isList={false}
        isWrite={false}
        isRead={true}
        isEdit={false}
      />
      <CategoryInfomation
        category={category}
        loading={loading}
        error={error}
        isList={false}
        isWrite={false}
        isRead={true}
        isEdit={false}
      />
    </>
  );
};

export default CategoryReadContainer;
// export default React.memo(CategoryReadContainer);
