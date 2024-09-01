import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchCategoryListAction } from '../../modules/categoryList';
import Searching from '../layouts/Searching';

// console.log(
//   'CategoryListPage.js > CategoryListContainer.js > CategoryHeader.js',
// );
const CategoryHeader = ({
  categories,
  // categoryId,
  // category,
  loading,
  onEdit,
  onPublish,
  onCancle,
  onDelete,
  filtering,
  search,
  error,
  isList,
  isWrite,
  isRead,
  isEdit,
}) => {
  console.log(
    'CategoryListPage.js > CategoryListContainer.js > CategoryHeader.js',
  );
  // 에러 발생 시
  //   if (error) {
  //     if (error.response && error.response.status === 404) {
  //       return (
  //         <CategoryViewerBlock>존재하지 않는 포스트입니다.</CategoryViewerBlock>
  //       );
  //     }
  //     return <CategoryViewerBlock>오류 발생!</CategoryViewerBlock>;
  //   }

  // 로딩 중이거나 아직 포스트 데이터가 없을 때
  if (loading) {
    console.log('CategoryHeader.js > loading : ', loading);
    return null;
  }

  var title = null;
  var component = null;

  if (isList) {
    title = 'List';
    component = (
      <Link
        to={'/settings/category/write'}
        className="btn btn-primary"
        variant="primary"
      >
        Write
      </Link>
    );
  } else if (isWrite) {
    title = 'Write';
    component = <Button onClick={onPublish}>Save</Button>;
  } else if (isRead) {
    title = 'Read';
    component = (
      <Link
        to={'/settings/category/edit'}
        className="btn btn-primary"
        variant="primary"
        onClick={onEdit}
      >
        Edit
      </Link>
    );
  } else if (isEdit) {
    title = 'Edit';
    component = <Button onClick={onPublish}>Save</Button>;
  } else {
    title = 'Error';
    component = null;
  }

  return (
    <>
      <Card className="mb-2">
        <Card.Header as="h3">Category {title} 12</Card.Header>
        <Card.Body>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          {component}{' '}
          {isList ? (
            <Searching
              placement={'end'}
              name={'Category'}
              contents={categories}
              search={search}
              filtering={filtering}
            >
              Search
            </Searching>
          ) : (
            <Button variant="warning" onClick={onCancle}>
              Cancel
            </Button>
          )}{' '}
          {isRead ? (
            <Button variant="danger" onClick={onDelete}>
              Delete
            </Button>
          ) : (
            ''
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default React.memo(CategoryHeader);
