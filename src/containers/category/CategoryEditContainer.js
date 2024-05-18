import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CategoryHeader from '../../components/category/CategoryHeader';
import CategoryInfomation from '../../components/category/CategoryInfomation';
import {
  changeCategoryName,
  changeCategoryNote,
  editCategory,
} from '../../modules/categoryWrite';

const CategoryEditContainer = () => {
  // const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, loading, error } = useSelector(
    ({ categoryRead, categoryWrite }) => ({
      // category: categoryRead.category,
      category: categoryWrite.category,
    }),
  );

  const onChangeCategoryName = useCallback(
    (payload) => dispatch(changeCategoryName(payload)),
    [dispatch],
  );

  const onChangeCategoryNote = useCallback(
    (payload) => dispatch(changeCategoryNote(payload)),
    [dispatch],
  );

  const onPublish = () => {
    const { categoryName, note, id } = category;
    dispatch(
      editCategory({
        categoryName,
        note,
        id,
      }),
    );
    navigate(`/settings/category/`);
  };

  const onCancle = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.log('categoryEdit');
  }, [category]);

  return (
    <>
      <CategoryHeader
        category={category}
        loading={loading}
        onCancle={onCancle}
        onPublish={onPublish}
        error={error}
        isList={false}
        isWrite={false}
        isRead={false}
        isEdit={true}
      />
      <CategoryInfomation
        category={category}
        loading={loading}
        // onChangeField={onChangeField}
        onChangeCategoryName={onChangeCategoryName}
        onChangeCategoryNote={onChangeCategoryNote}
        error={error}
        isList={false}
        isWrite={false}
        isRead={false}
        isEdit={true}
      />
    </>
  );
};

export default CategoryEditContainer;
