import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CategoryInfomation from '../../components/category/CategoryInfomation';
import {
  categoryWriteUnload,
  changeCategoryName,
  changeCategoryNote,
  writeCategory,
} from '../../modules/categoryWrite';
import CategoryHeader from '../../components/category/CategoryHeader';

const CategoryWriteContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { category, categoryName, note, categoryDetails, loading, error } =
  //   useSelector(({ categoryWrite }) => ({
  //     category: categoryWrite.category,
  //     categoryName: categoryWrite.categoryName,
  //     note: categoryWrite.note,
  //   }));

  const { category, loading, error } = useSelector(({ categoryWrite }) => ({
    category: categoryWrite.category,
    error: categoryWrite.error,
  }));

  const onChangeCategoryName = useCallback(
    (payload) => dispatch(changeCategoryName(payload)),
    [dispatch],
  );

  const onChangeCategoryNote = useCallback(
    (payload) => dispatch(changeCategoryNote(payload)),
    [dispatch],
  );

  const onPublish = () => {
    const { categoryName, note } = category;
    dispatch(
      writeCategory({
        categoryName,
        note,
      }),
    );
    dispatch(categoryWriteUnload());
    navigate(`/settings/category`);
  };

  const onCancle = () => {
    dispatch(categoryWriteUnload());
    navigate(-1);
  };

  // useEffect(() => {
  //   console.log('categoryWrite Response : ' + category);
  //   // navigate(`/settings/category`);
  //   if (category) {
  //     // const { categoryName, note } = category;
  //     console.log('categoryName : ', categoryName);
  //     console.log('note : ', note);
  //     // navigate(`/@${user.username}/${_id}`);
  //     // navigate(`/settings/category`);
  //   }
  //   // if (postError) {
  //   //   console.log(postError);
  //   // }
  //   // }, [history, post, postError]);
  // }, [category]);

  return (
    <>
      <CategoryHeader
        category={category}
        loading={loading}
        onCancle={onCancle}
        onPublish={onPublish}
        error={error}
        isList={false}
        isWrite={true}
        isRead={false}
        isEdit={false}
      />
      <CategoryInfomation
        category={category}
        loading={loading}
        // onChangeField={onChangeField}
        onChangeCategoryName={onChangeCategoryName}
        onChangeCategoryNote={onChangeCategoryNote}
        error={error}
        isList={false}
        isWrite={true}
        isRead={false}
        isEdit={false}
      />
      {/* <CategoryDetailInformation
        onChangeField={onChangeField}
        categoryDetails={categoryDetails}
      /> */}
    </>
  );
};

export default CategoryWriteContainer;
