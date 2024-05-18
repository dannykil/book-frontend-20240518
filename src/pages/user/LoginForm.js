import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

let url = 'http://localhost:8080'; // local
// let url = 'http://13.124.143.225:8080'; // dev

const LoginForm = () => {
  let navigate = useNavigate();

  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const changeValue = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const submitLogin = (e) => {
    e.preventDefault(); // submit이 액션을 안타고 자기 할일을 그만함
    console.log(login);
    // fetch(url + '/book/login', {
    fetch(url + '/auth/loginProc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(login),
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
          alert('로그인에 실패하셨습니다.');
        }
      });
  };

  return (
    <Form onSubmit={submitLogin}>
      <div>
        <h1 className="mt-5">로그인</h1>
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
            type="password"
          />
        </InputGroup>
        <br />
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            로그인
          </Button>
          <Button variant="primary" size="lg">
            계정찾기
          </Button>
          <Button variant="primary" size="lg">
            비밀번호찾기
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
