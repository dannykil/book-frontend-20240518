import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

// console.log(
//   'CategoryListPage.js > CategoryListContainer.js > CategoryList.js > CategoryItem.js',
// );
const CategoryItem = (props) => {
  const navigate = useNavigate();
  console.log(
    'CategoryListPage.js > CategoryListContainer.js > CategoryList.js > CategoryItem.js',
  );
  const { id, categoryName, insertDT } = props.category;
  // console.log(category);

  // const inputDateString = '2023-08-29 23:24:45.654178+00';
  const inputDate = new Date(insertDT);

  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
  const day = inputDate.getDate().toString().padStart(2, '0');
  const hour = inputDate.getHours();
  const minute = inputDate.getMinutes();
  const period = hour >= 12 ? '오후' : '오전';

  const formattedHour = (hour % 12).toString().padStart(2, '0');
  const formattedMinute = minute.toString().padStart(2, '0');

  // const formattedDateString = `${year}년 ${month}월 ${day}일 ${period} ${formattedHour}시 ${formattedMinute}분`;
  const formattedDateString = `${year}-${month}-${day} ${hour}:${minute}`;

  const onRead = () => {
    navigate(`/settings/category/` + id);
  };

  return (
    // <Card className="mb-2" onClick={onRead} text="primary">
    <Card className="mb-2" onClick={onRead}>
      <Card.Body>
        <Card.Title>{categoryName}</Card.Title>
        <Card.Text>{formattedDateString}</Card.Text>
        {/* <Link
          to={'/settings/category/' + id}
          className="btn btn-primary"
          variant="primary"
          // categoryName={categoryName}
        >
          Read Details
        </Link> */}
      </Card.Body>
    </Card>
  );
};

export default CategoryItem;
