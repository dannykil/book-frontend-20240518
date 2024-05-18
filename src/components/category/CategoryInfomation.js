import React from 'react';
import { Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import categoryRead from '../../modules/categoryRead';

const CategoryInfomation = ({
  category,
  loading,
  error,
  isList,
  isWrite,
  isRead,
  isEdit,
  onChangeField,
  onChangeCategoryName,
  onChangeCategoryNote,
}) => {
  console.log('categoryInformation');
  // console.log('category : ', category);
  // console.log('categoryName : ', category.categoryName);
  // console.log('isList : ', isList);
  // console.log('isWrite : ', isWrite);
  // console.log('isRead : ', isRead);
  // console.log('isEdit : ', isEdit);
  // const { id, categoryName, writer, writerCode, insertDT, note } = category; // 2024.04.13 데이터 검증작업 없이 위에 선언하면 에러발생(데이터 못읽음)

  // const onChangeCategoryField = (e) => {
  //   // console.log('Category Info : ' + e.target.value);
  //   // onChangeField({ key: 'categoryName', value: e.target.value });
  //   onChangeField({ category: category });
  // };

  const onChangeCategory = (e) => {
    // console.log('Category Info : ' + e.target.value);
    // onChangeField({ key: 'categoryName', value: e.target.value });
    onChangeCategoryName({ category: category, value: e.target.value });
  };

  const onChangeNote = (e) => {
    onChangeCategoryNote({ category: category, value: e.target.value });
  };

  // if (error) {
  //   if (error.response && error.response.status === 404) {
  //     // return <PostViewerBlock>존재하지 않는 포스트입니다.</PostViewerBlock>;
  //     return <>존재하지 않는 포스트입니다.</>;
  //   }
  //   // return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  //   return <>오류 발생!</>;
  // }

  // 2024.04.13 오류해결
  // 아래 주석처리하면 오류남
  if (loading || (!category && isRead)) {
    return null;
  }

  // 2024.04.13 오류해결
  // 데이터 검증작업 없이 위에 선언하면 에러발생(데이터 못읽음)
  // const { id, categoryName, writer, writerCode, insertDT, note } = category;
  const { categoryName, writer, writerCode, insertDT, note } = category;

  return (
    <Card className="mb-2">
      <Card.Header as="h5">Category Info.</Card.Header>
      <Card.Body>
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Category">
              {isRead ? (
                <Form.Control
                  type="input"
                  placeholder="Category"
                  value={categoryName}
                  disabled
                />
              ) : isEdit ? (
                <Form.Control
                  type="input"
                  placeholder="Category"
                  onChange={onChangeCategory}
                  value={categoryName}
                />
              ) : (
                <Form.Control
                  type="input"
                  placeholder="Category"
                  onChange={onChangeCategory}
                />
              )}
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Note">
              {isRead ? (
                <Form.Control
                  type="input"
                  placeholder="note"
                  value={note}
                  disabled
                />
              ) : isEdit ? (
                <Form.Control
                  type="input"
                  placeholder="note"
                  onChange={onChangeNote}
                  value={note}
                />
              ) : (
                <Form.Control
                  type="input"
                  placeholder="note"
                  onChange={onChangeNote}
                />
              )}
            </FloatingLabel>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CategoryInfomation;
// export default React.memo(CategoryInfomation);
