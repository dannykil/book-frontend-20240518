import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

let url = 'http://localhost:8080'; // local
// let url = 'http://13.124.143.225:8080'; // dev

const JoinForm = () => {
  let navigate = useNavigate();

  const [join, setJoin] = useState({
    username: '',
    password: '',
  });

  const changeValue = (e) => {
    setJoin({ ...join, [e.target.name]: e.target.value });
  };

  const submitInsert = (e) => {
    e.preventDefault(); // submit이 액션을 안타고 자기 할일을 그만함
    console.log(join);
    fetch(url + '/api/user/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(join),
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
          navigate('/');
        } else {
          alert('회원등록에 실패하셨습니다.');
        }
      });
  };

  return (
    <Form onSubmit={submitInsert}>
      <div>
        <h1 className="mt-5">회원등록</h1>
        <br />
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            placeholder="계정을 입력하세요"
            aria-label="계정"
            aria-describedby="inputGroup-sizing-sm"
            onChange={changeValue}
            name="username"
          />
        </InputGroup>
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            placeholder="비밀번호를 입력하세요"
            aria-label="비밀번호"
            aria-describedby="inputGroup-sizing-sm"
            onChange={changeValue}
            name="password"
          />
        </InputGroup>
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            placeholder="이메일을 입력하세요"
            aria-label="이메일"
            aria-describedby="inputGroup-sizing-sm"
            onChange={changeValue}
            name="email"
          />
        </InputGroup>
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            placeholder="사번을 입력하세요"
            aria-label="사번"
            aria-describedby="inputGroup-sizing-sm"
            onChange={changeValue}
            name="personCode"
          />
        </InputGroup>
        <br />
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            회원등록
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default JoinForm;
