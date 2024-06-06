import React from 'react';
import { Alert, Card, Form } from 'react-bootstrap';

const ChatRoom = ({
  saveMsg,
  sessionId,
  result,
  keyDown,
  msg,
  messageEndRef,
}) => {
  console.log('---------- ChatRoom');
  console.log('---------- ChatRoom result : ', result);
  //   console.log('ChatRoom result.length : ', result.length);
  //   console.log('ChatRoom result : ', result);
  //   console.log('ChatRoom userName : ', userName);
  //   console.log('ChatRoom msg : ', msg);
  //   console.log('ChatRoom ws : ', ws);

  //   document.addEventListener('keypress', function (e) {
  //     //   console.log('addEventListener : ', e);
  //     if (e.keyCode === 13) {
  //       //enter press
  //       send();
  //     }
  //   });

  return (
    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body id="chatContents">
        {result.map((item, index) =>
          item.me ? (
            <Card.Text style={{ textAlign: 'right' }}>
              {item.userName}
              <Alert
                key={index}
                variant="primary"
                style={{
                  textAlign: 'right',
                  fontSize: '1rem',
                  padding: '0.5rem',
                }}
              >
                {item.msg}
              </Alert>
            </Card.Text>
          ) : (
            <Card.Text style={{ textAlign: 'left' }}>
              {item.userName}
              <Alert
                key={index}
                variant="dark"
                style={{
                  textAlign: 'left',
                  fontSize: '1rem',
                  padding: '0.5rem',
                }}
              >
                {item.msg}
              </Alert>
            </Card.Text>
          ),
        )}
        <div ref={messageEndRef}></div>
      </Card.Body>
      <Card.Footer className="text-muted">
        {/* 핸드폰의 경우는 엔터입력을 어떻게 해야하나? */}
        <Form.Control
          type="input"
          placeholder="Press Enter to Send Message"
          onChange={saveMsg}
          onKeyDown={keyDown}
          value={msg}
        />
        <Form.Control
          type="hidden"
          id="sessionCode"
          value={sessionId}
          disabled
        />
        {/* <Button variant="primary" onClick={send}>
          Send
        </Button> */}
      </Card.Footer>
    </Card>
  );
};

export default ChatRoom;
