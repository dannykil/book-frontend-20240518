import React, { useState } from 'react';
import { Button, Form, Offcanvas } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Searching = ({ name, ...props }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectedDate, setSelectedDate] =
    (useState < Date) | (null > new Date());
  console.log('Searching > contents : ', props.contents);
  console.log('Searching > search : ', props.search);
  console.log('Searching > name : ', name);
  console.log(
    'Searching > Object.keys(props.search) : ',
    Object.keys(props.search),
  );
  console.log(
    'Searching > Object.values(props.search) : ',
    Object.values(props.search),
  );

  // for (const key in Object.keys(props.search)) {
  //   console.log(props.search[key].categoryName); // "쓴 맛", "고소한 맛", "달콤한 맛"
  //   console.log(key);
  //   console.log(Object.keys(props.search).length);
  // }

  //
  const setSearchingItems = () => {
    const searchItems = Object.keys(props.search);
    const result = [];

    if (searchItems.length > 0) {
      for (const key in Object.keys(props.search)) {
        if (Object.keys(props.search)[key] === 'insertDT') {
          result.push(
            <Form.Control
              type="input"
              className="mb-2"
              placeholder={Object.keys(props.search)[key]}
              // value={searchValue}
              // onChange={saveSearchValue}
            />,
            // https://github.com/pushtell/react-bootstrap-date-picker?tab=readme-ov-file
            // https://doooodle932.tistory.com/150
            // npm install react-datepicker date-fns
            <ReactDatePicker
              dateFormat="yyyy-MM-dd" // 날짜 형태
              shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
              minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
              maxDate={new Date()} // maxDate 이후 날짜 선택 불가
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />,
          );
        } else {
          result.push(
            <Form.Control
              type="input"
              className="mb-2"
              placeholder={Object.keys(props.search)[key]}
              // value={searchValue}
              // onChange={saveSearchValue}
            />,
          );
        }
      }
      console.log('result : ', result);
    } else {
      result
        .push
        // <Pagination.First onClick={(event) => handleClick(event, 1)} />,
        ();
    }
    return result;
  };

  const handleClick = (event, value) => {
    console.log('event : ', event);
    console.log('value : ', value);
    // dispatch(searchCategoryListAction(value));
    // filtering();
  };

  const saveSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {/* {name} */}
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
