import React, { useEffect, useState } from 'react';
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
import CategoryInfomationDetail from '../../components/category/CategoryInfomationDetail';
import { Alert, Col, FloatingLabel, Form, Row } from 'react-bootstrap';

const CategoryReadContainer = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('CategoryReadContainer');

  const { category, loading, error } = useSelector(
    ({ categoryRead, loading, error }) => ({
      category: categoryRead.category,
      error: categoryRead.error,
      loading: loading['category/READ_Category'],
    }),

  );
  
  // const [show, setShow] = useState(true);
  // const [items, setItems] = useState(
  //   [...Array(length)].map((_, i) => ({
  //     id: `${i}`, content: <Alert variant="light" onClose={() => setShow(false)} dismissible>
  //       <Row className="g-2">
  //         <Col md>
  //           <FloatingLabel controlId="floatingInputGrid" label="Category">
  //             <Form.Control
  //               type="input"
  //               placeholder="Category"
  //               // value={category.categoryDetailDto.categoryId}
  //               // value={items.length}
  //               // value={items.id}
  //               // onChange={}
  //               value={i}
  //             />
  //           </FloatingLabel>
  //         </Col>
  //         <Col md>
  //           <FloatingLabel controlId="floatingInputGrid" label="Note">
  //             <Form.Control
  //               type="input"
  //               placeholder="note"
  //             // value={note}
  //             value={i}
  //             />
  //           </FloatingLabel>
  //         </Col>
  //       </Row>
  //     </Alert>
  //   })),
  // );

  // const onDragEnd = ({ source, destination }) => {
  //   // console.log('>>> source', source);
  //   // console.log('>>> destination', destination);
  //   // console.log('>>> items', items);
  //   const _items = items;
  //   // console.log('>>> _items', _items);
  //   const [targetItem] = _items.splice(source.index, 1);
  //   // console.log('>>> targetItem', targetItem);
  //   // console.log(category.categoryDetailDto.length)
  //   _items.splice(destination.index, 0, targetItem);
  //   setItems(_items);
  // };

  useEffect(() => {
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
      <CategoryInfomationDetail category={category} />
      {/* <CategoryInfomationDetail
        onDragEnd={onDragEnd}
        items={items} /> */}
    </>
  );
};

export default CategoryReadContainer;
// export default React.memo(CategoryReadContainer);
