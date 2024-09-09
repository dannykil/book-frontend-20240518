import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CategoryInfomation from '../../components/category/CategoryInfomation';
import {
  addCategoryDetail,
  categoryWriteUnload,
  changeCategoryDetailName,
  changeCategoryName,
  changeCategoryNote,
  writeCategory,
} from '../../modules/categoryWrite';
import CategoryHeader from '../../components/category/CategoryHeader';
import { categoryListAction } from '../../modules/categoryList';
import { Alert, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import CategoryInfomationDetail from '../../components/category/CategoryInfomationDetail';

const CategoryWriteContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [categoryDetailId, setCategoryDetailId] = useState(0);
  const [priority, setPriority] = useState(0);
  // const [items, setItems] = useState();
  const [items, setItems] = useState(
    [...Array(0)].map((_, i) => ({
      // id: `${i}`, content: <Alert variant="light" onClose={() => setShow(false)} onChange={setRowNo(items.length)} dismissible>
      id: `${i}`, content: <Alert variant="light" onClose={() => setShow(false)} dismissible>
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Category">
              <Form.Control
                type="input"
                placeholder="Category"
                // value={categoryName}
                // value={items.length}
                // value={items.id}
                value={i}
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Note">
              <Form.Control
                type="input"
                placeholder="note"
              // value={note}
              // value={i}
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Alert>
    })),
  );

  const onDragEnd = ({ source, destination }) => {
    console.log('>>> source', source);
    console.log('>>> destination', destination);
    console.log('>>> items', items);
    // const _items = JSON.parse(JSON.stringify(items));
    const _items = items;
    console.log('>>> _items', _items);
    const [targetItem] = _items.splice(source.index, 1);
    console.log('>>> targetItem', targetItem);
    _items.splice(destination.index, 0, targetItem);
    setItems(_items);
  };

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

  const onAddCategoryDetail = useCallback(
    (payload) => dispatch(addCategoryDetail(payload)),
    [dispatch],
  );

  const onChangeDetailName = (e) => {
    // console.log(e.target.value)
    // console.log(priority)
    onChangeCategoryDetailName({ category: category, value: e.target.value, priority: priority });
  };

  const onChangeCategoryDetailName = useCallback(
    (payload) => dispatch(changeCategoryDetailName(payload)),
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
    dispatch(categoryListAction());
  };

  const onCancle = () => {
    dispatch(categoryWriteUnload());
    navigate(-1);
  };

  const onAdd = () => {
    setItems((items) => [
      ...items,
      {
        // id: `${items.length}`, content: <Alert variant="light" onClose={() => setShow(false)} onChange={setRowNo(items.length)} dismissible>
        // id: `${items.length}`, content: <Alert variant="light" onClose={() => setShow(false)} onChange={() => {setPriority(priority+1); setCategoryDetailId(categoryDetailId+1);}} dismissible>
        // id: `${items.length}`, content: <Alert variant="light" onClose={() => setShow(false)} onChange={setPriority(priority+1)} dismissible>
        id: `${items.length}`, content: <Alert variant="light" onClose={() => setShow(false)} onChange={setPriority(priority+1)} dismissible>
          <Row className="g-2">
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Category Detail Name">
                <Form.Control
                  type="input"
                  onChange={onChangeDetailName}
                  // placeholder="Category Detail Name"
                  // value={items.id}
                  // value={items.length}
                />
              </FloatingLabel>
            </Col>
            <Col md>
              <FloatingLabel controlId="floatingInputGrid" label="Category Detail Note">
                <Form.Control
                  type="input"
                  // onChange={onChangeCategoryDetailName}
                  // placeholder="Input Category Detail Note"
                // value={note}
                />
              </FloatingLabel>
            </Col>
          </Row>
        </Alert>
      },
      // setRowNo(items.length)
    ],
    // onAddCategoryDetail({ rowNo: 0, categoryDetailName: '', categoryDetailNote: '' }) // 이상없음
  );
  onAddCategoryDetail({ categoryDetailId: categoryDetailId, priority: priority, categoryDetailName: '', categoryDetailNote: '' }); // 이상없음
  }

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
        onAdd={onAdd}
        onAddCategoryDetail={addCategoryDetail}
        // onAdd2={onAdd2}
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
      <CategoryInfomationDetail
        onDragEnd={onDragEnd}
        items={items} />
    </>
  );
};

export default CategoryWriteContainer;
