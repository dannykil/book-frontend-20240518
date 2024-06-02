import React from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';

const ChatRoom = ({ saveMsg, sessionId, send }) => {
  return (
    <Card className="text-center">
      <Card.Header>Featured</Card.Header>
      <Card.Body id="chatContents">
        {/* <Card.Title>Special title treatment</Card.Title> */}
        <Card.Text style={{ textAlign: 'left' }}>
          hi
          <Alert
            key={1}
            variant="secondary"
            style={{
              textAlign: 'left',
              fontSize: '1rem',
              padding: '0.5rem',
            }}
          >
            This is a primary alert
            {/* <Alert.Link href="#">an example link</Alert.Link> */}
          </Alert>
        </Card.Text>
        <Card.Text style={{ textAlign: 'right' }}>
          hi
          <Alert
            key={1}
            variant="primary"
            style={{
              textAlign: 'right',
              fontSize: '1rem',
              padding: '0.5rem',
            }}
          >
            This is a primary alert
          </Alert>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {/* 핸드폰의 경우는 엔터입력을 어떻게 해야하나? */}
        <Form.Control
          type="input"
          placeholder="Press Enter to Send Message"
          onChange={saveMsg}
        />
        <Form.Control
          type="hidden"
          id="sessionCode"
          value={sessionId}
          disabled
        />
        <Button variant="primary" onClick={send}>
          Send
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ChatRoom;
