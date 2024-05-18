import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

let url = 'http://localhost:8080'; // local
// let url = 'http://13.124.143.225:8080'; // dev

const SaveForm = (props) => {
  let navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    author: '',
  });

  const changeValue = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const submitBook = (e) => {
    e.preventDefault(); // submit이 액션을 안타고 자기 할일을 그만함
    // fetch('http://localhost:8080/book', {
    fetch(url + '/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(book),
    })
      .then((res) => {
        console.log(1, res);
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          console.log('정상', res);
          //props.history.push('/');
          navigate('/');
        } else {
          alert('책 등록에 실패하셨습니다.');
        }
      });
    // .then()에서 실패 시 catch()로 넘어오게 된다. ex) json관련해서 오류가 났을 경우(거의 쓸일이 없다)
    // .catch((error) => {
    //   console.log('실패', error);
    // });
  };

  return (
    <Form onSubmit={submitBook}>
      <h1 className="mt-5">등록하기</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          onChange={changeValue}
          name="title"
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter author"
          onChange={changeValue}
          name="author"
        />
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SaveForm;
