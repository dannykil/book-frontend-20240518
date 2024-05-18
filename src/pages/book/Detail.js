import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

let url = 'http://localhost:8080';
// let url = 'http://13.124.143.225:8080';

const Detail = (props) => {
  console.log('detail', props);
  let navigate = useNavigate();

  //const id = props.match.params.id;
  const { id } = useParams();

  const [book, setBook] = useState({
    id: '',
    title: '',
    author: '',
  });

  useEffect(() => {
    //fetch('http://localhost:8080/book/' + id)
    fetch(url + '/book/' + id)
      .then((res) => res.json())
      .then((res) => {
        setBook(res);
      });
  }, []);

  const updateBook = () => {
    navigate('/updateForm/' + id);
  };

  const deleteBook = () => {
    //fetch('http://localhost:8080/book/' + id, { method: 'DELETE' })
    fetch(url + '/book/' + id, { method: 'DELETE' })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          navigate('/');
        } else {
          alert('삭제실패');
        }
      });
  };

  return (
    <div>
      <h1>상세보기</h1>
      <Button variant="primary" onClick={updateBook}>
        수정
      </Button>{' '}
      <Button variant="danger" onClick={deleteBook}>
        삭제
      </Button>
      <hr />
      <h1>{book.title}</h1>
      <h3>{book.author}</h3>
    </div>
  );
};

export default Detail;
