import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeCurrentPageAction } from '../../modules/categoryList';

// console.log('CategoryListPage.js > PaginationContainer.js > Pagination.js');
const Paging = ({ categories, pagination, search, loading }) => {
  const dispatch = useDispatch();
  console.log('CategoryListPage.js > PaginationContainer.js > Pagination.js');

  // if (loading) {
  //   console.log('Paging.js > loading : ', loading);
  //   return null;
  // }

  const handleClick = (event, id) => {
    dispatch(changeCurrentPageAction(id));
  };

  const paging = () => {
    const result = [];
    for (let i = pagination.startBlock; i <= pagination.endBlock; i++) {
      if (i > pagination.totalPage) {
        // result.push();
      } else {
        if (pagination.currentPage === i) {
          result.push(
            <Pagination.Item active key={i}>
              {i}
            </Pagination.Item>,
          );
        } else {
          result.push(
            <Pagination.Item onClick={(event) => handleClick(event, i)} key={i}>
              {i}
            </Pagination.Item>,
          );
        }
      }
    }
    return result;
  };

  // 첫 페이지로 이동하기
  const moveFirst = () => {
    const result = [];
    if (pagination.startPage === 1) {
      result.push(<Pagination.First disabled />);
    } else {
      result.push(
        <Pagination.First onClick={(event) => handleClick(event, 1)} />,
      );
    }
    return result;
  };

  // 마지막 페이지로 이동하기
  const moveLast = () => {
    const result = [];
    if (pagination.currentPage === pagination.totalPage) {
      result.push(<Pagination.Last disabled />);
    } else {
      result.push(
        <Pagination.Last
          onClick={(event) => handleClick(event, pagination.totalPage)}
        />,
      );
    }
    return result;
  };

  // 이전 페이지 블럭으로 이동하기
  const movePrev = () => {
    const result = [];
    if (pagination.startBlock === 1) {
      result.push(<Pagination.Prev disabled />);
    } else {
      result.push(
        <Pagination.Prev
          onClick={(event) => handleClick(event, pagination.startBlock - 5)}
        />,
      );
    }
    return result;
  };

  // 다음 페이지 블럭으로 이동하기
  const moveNext = () => {
    const result = [];
    if (
      pagination.startBlock <= pagination.totalPage &&
      pagination.totalPage <= pagination.endBlock
    ) {
      result.push(<Pagination.Next disabled />);
    } else {
      result.push(
        <Pagination.Next
          onClick={(event) => handleClick(event, pagination.startBlock + 5)}
        />,
      );
    }
    return result;
  };

  return (
    <Pagination>
      {moveFirst()}
      {movePrev()}
      {paging()}
      {moveNext()}
      {moveLast()}
    </Pagination>
  );
};

export default Paging;
