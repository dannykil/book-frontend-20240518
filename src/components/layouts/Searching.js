import React, { useState } from 'react';
import { Button, Form, Offcanvas } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { searchCategoryListAction } from '../../modules/categoryList';

const Searching = ({ name, filtering, ...props }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');
  const [insertDT, setInsertDT] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  // const [selectedDate, setSelectedDate] =
  //   (useState < Date) | (null > new Date());

  const setSearchingItems = () => {
    const searchItems = Object.keys(props.search);
    const result = [];

    for (const key in Object.keys(props.search)) {
      if (Object.keys(props.search)[key] === 'insertDT') {
        result.push(
          <ReactDatePicker
            name={Object.keys(props.search)[key]}
            placeholder={'Insert ' + Object.keys(props.search)[key]}
            dateFormat="yyyy-MM-dd" // 날짜 형태
            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
            minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
            maxDate={new Date()} // maxDate 이후 날짜 선택 불가
            // selected={selectedDate}
            // onChange={(date) => setSelectedDate(date)}
            selected={insertDT}
            onChange={(date) => setInsertDT(date)}
            customInput={<Form.Control />}
          />,
        );
      } else {
        result.push(
          <Form.Control
            type="input"
            name={Object.keys(props.search)[key]}
            className="mb-2"
            placeholder={'Insert ' + Object.keys(props.search)[key]}
            // value={searchValue}
            onChange={saveSearchValue}
          />,
        );
      }
    }

    // if (searchItems.length > 0) {
    //   for (const key in Object.keys(props.search)) {
    //     if (Object.keys(props.search)[key] === 'insertDT') {
    //       result.push(
    //         <Form.Control
    //           type="input"
    //           className="mb-2"
    //           placeholder={Object.keys(props.search)[key]}
    //           // value={searchValue}
    //           // onChange={saveSearchValue}
    //         />,
    //         // https://github.com/pushtell/react-bootstrap-date-picker?tab=readme-ov-file
    //         // https://doooodle932.tistory.com/150
    //         // npm install react-datepicker date-fns
    //         <ReactDatePicker
    //           dateFormat="yyyy-MM-dd" // 날짜 형태
    //           shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
    //           minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
    //           maxDate={new Date()} // maxDate 이후 날짜 선택 불가
    //           selected={selectedDate}
    //           onChange={(date) => setSelectedDate(date)}
    //         />,
    //       );
    //     } else {
    //       result.push(
    //         <Form.Control
    //           type="input"
    //           className="mb-2"
    //           placeholder={Object.keys(props.search)[key]}
    //           // value={searchValue}
    //           // onChange={saveSearchValue}
    //         />,
    //       );
    //     }
    //   }
    //   console.log('result : ', result);
    // } else {
    //   result
    //     .push
    //     // <Pagination.First onClick={(event) => handleClick(event, 1)} />,
    //     ();
    // }
    return result;
  };

  const handleClick = (event, value) => {
    // console.log('event : ', event);
    // console.log('value : ', value);
    const inputDate = new Date(insertDT);
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const formattedDateString = `${year}-${month}-${day}`;

    console.log('Searching > handleClick() ');
    console.log('categoryName : ', categoryName);
    console.log('insertDT : ', formattedDateString);

    let search = { categoryName: categoryName, insertDT: formattedDateString };
    // dispatch(searchCategoryListAction(categoryName, insertDT));
    dispatch(searchCategoryListAction(search));
    setShow(false);
  };

  const saveSearchValue = (event) => {
    console.log(event.target.name, ' : ', event.target.value);

    if (event.target.name === 'categoryName') {
      setCategoryName(event.target.value);
    } else {
      // console.log(insertDT);
      // setInsertDT(event.target.value);
      // setSelectedDate(event.target.value);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        Search
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Searching in {name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{setSearchingItems()}</Offcanvas.Body>
        <Button
          variant="success"
          onClick={(event) => handleClick(event, searchValue)}
        >
          Search
        </Button>
      </Offcanvas>
    </>
  );
};

export default Searching;
