import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// 구조분할 방법 1
const BookItem = (props) => {
  const { id, title, author } = props.book;
  // 구조분할 방법 2
  // const BookItem = ({ id, title, author }) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{author}</Card.Text>
        <Link to={'/book/' + id} className="btn btn-primary" variant="primary">
          상세보기
        </Link>
      </Card.Body>
    </Card>
  );
};

export default BookItem;
