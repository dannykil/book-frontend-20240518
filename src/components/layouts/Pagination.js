import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeCurrentPageAction } from '../../modules/categoryList';

// console.log('CategoryListPage.js > PaginationContainer.js > Pagination.js');
const Paging = ({ categories, pagination, search, loading }) => {
  const dispatch = useDispatch();
  // console.log('categories : ', categories);
  // console.log('pagination : ', pagination);
  // console.log('loading : ', loading);
  console.log('search : ', search);

  // if (loading) {
  //   console.log('Paging.js > loading : ', loading);
  //   return null;
  // }

  const handleClick = (event, id) => {
    console.log('event : ', event);
    console.log('id : ', id);
    dispatch(changeCurrentPageAction(id));
    // const selectedIndex = selected.indexOf(id);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, id);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //   );
    // }
    // setSelected(newSelected);
  };

  const paging = () => {
    const result = [];
    for (let i = pagination.startBlock; i <= pagination.endBlock; i++) {
      // for (let i = 1; i <= pagination.totalCount; i++) {
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
    // if (pagination.startBlock === 1) {
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

  // return (
  // <Pagination>
  //   <Pagination.First />
  //   <Pagination.Prev />
  //   <Pagination.Item>{1}</Pagination.Item>
  //   <Pagination.Ellipsis />

  //   <Pagination.Item>{10}</Pagination.Item>
  //   <Pagination.Item>{11}</Pagination.Item>
  //   <Pagination.Item active>{12}</Pagination.Item>
  //   <Pagination.Item>{13}</Pagination.Item>
  //   <Pagination.Item disabled>{14}</Pagination.Item>

  //   <Pagination.Ellipsis />
  //   <Pagination.Item>{20}</Pagination.Item>
  //   <Pagination.Next />
  //   <Pagination.Last />
  // </Pagination>
  // );
};

export default Paging;
