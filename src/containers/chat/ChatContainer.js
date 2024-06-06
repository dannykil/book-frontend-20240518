import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery'; // npm i jquery
import ChatHeader from '../../components/chat/ChatHeader';
import ChatRoom from '../../components/chat/ChatRoom';
import { Alert, Button, Card, Form } from 'react-bootstrap';
// npm install @stomp/stompjs
// npm install sockjs-client
// 버전 문제시 --force 붙혀준다

// 채팅방 과제
// 1) 채팅방에서 화면 refresh해도 세션ID 유지 + 언제 끊을지?
// 2) 강제 세션끊기(방장 권한)
// 3) 귓속말(계정이 필요할텐데...)
// 4) ** 채팅방 리스트 만들기
// 5) 채팅내용 DB 저장하기(현재는 서버 재구동 시 채팅내용이 모두 날라감) >>> 내용 가져오(선택할 수 있게)
// 6) 웹소켓 명령어 이해하기(open, onmessage, message 등)
// 7) 계정별, IP별 채팅방 생성갯수 제한
// 8)

var ws;

const ChatContainer = () => {
  window.$ = $;

  const [sessionId, setSessionId] = useState('');
  const [userName, setUserName] = useState('');
  const [msg, setMsg] = useState('');
  const [result, setResult] = useState([]); // 배열 내 '' 이나  null을 선언하는 순간 length가 1로 잡힘
  //   const messageEndRef = (useRef < HTMLDivElement) | (null > null);
  const messageEndRef = useRef();

  const saveUserName = (event) => {
    setUserName(event.target.value);
  };

  const saveMsg = (event) => {
    setMsg(event.target.value);
  };

  const wsOpen = () => {
    console.log('wsEvt()');
    //websocket을 지정한 URL로 연결
    ws = new WebSocket('ws://localhost:8080/chating');
    wsEvt();
  };

  const wsEvt = () => {
    console.log('wsEvt()');
    //소켓이 열리면 동작
    ws.onopen = () => {
      console.log('---------- onopen');
    };

    //서버로부터 데이터 수신 (메세지를 전달 받음)
    ws.onmessage = (e) => {
      console.log('---------- onmessage');
      //e 파라미터는 websocket이 보내준 데이터
      var msg = e.data; // 전달 받은 데이터
      if (msg !== null && msg.trim() !== '') {
        var d = JSON.parse(msg);

        //socket 연결시 sessionId 셋팅
        if (d.type === 'getId') {
          console.log('---------- getId');
          console.log('d : ', d);
          var si = d.sessionId;
          setSessionId(si);
          if (si !== '') {
            var obj = {
              type: 'open',
              sessionId: si,
              userName: userName,
            };
            //서버에 데이터 전송
            console.log('JSON.stringify(obj) : ', JSON.stringify(obj));
            ws.send(JSON.stringify(obj));
          }
        }
        //채팅 메시지를 전달받은 경우
        else if (d.type === 'message') {
          console.log('---------- message');
          console.log('d : ', d);

          // push3
          //   if (d.sessionId === $('#sessionCode').val()) {
          //     result.push(
          //       <Card.Text style={{ textAlign: 'right' }}>
          //         <Alert
          //           key={result.length}
          //           variant="primary"
          //           style={{
          //             textAlign: 'right',
          //             fontSize: '1rem',
          //             padding: '0.5rem',
          //           }}
          //         >
          //           {d.msg}
          //         </Alert>
          //       </Card.Text>,
          //     );
          //     console.log('ChatContainer result.length : ', result.length);
          //     console.log('ChatContainer result : ', result);
          //   } else {
          //     result.push(
          //       <Card.Text style={{ textAlign: 'left' }}>
          //         {d.userName}
          //         <Alert
          //           key={result.length}
          //           variant="secondary"
          //           style={{
          //             textAlign: 'left',
          //             fontSize: '1rem',
          //             padding: '0.5rem',
          //           }}
          //         >
          //           {d.msg}
          //         </Alert>
          //       </Card.Text>,
          //     );
          //     console.log('ChatContainer result.length : ', result.length);
          //     console.log('ChatContainer result : ', result);
          //   }
          // 3) push2
          if (d.sessionId === $('#sessionCode').val()) {
            // setMe(true);
            // result.push(d.msg);
            // result.push({
            //   me: true,
            //   msg: d.msg,
            //   userName: d.userName,
            // });
            setResult((result) => [
              ...result,
              {
                me: true,
                msg: d.msg,
                userName: d.userName,
              },
            ]);
            // setResult({
            //   me: true,
            //   msg: d.msg,
            //   userName: d.userName,
            // });
            // setResult(
            //   result.push({
            //     me: true,
            //     msg: d.msg,
            //     userName: d.userName,
            //   }),
            // );
            console.log('ChatContainer result.length : ', result.length);
            console.log('ChatContainer result : ', result);
          } else {
            // setMe(false);
            // result.push(d.msg);
            // result.push([
            //   {
            //     me: false,
            //     msg: d.msg,
            //     userName: d.userName,
            //   },
            // ]);
            setResult((result) => [
              ...result,
              {
                me: false,
                msg: d.msg,
                userName: d.userName,
              },
            ]);
            console.log('ChatContainer result.length : ', result.length);
            console.log('ChatContainer result : ', result);
          }
          // setMe(true);
          // $('#chatContents').append("<p class='me'>" + d.msg + '</p>');
          // 1) push1
          // result.push(
          //   <Alert
          //     key={1}
          //     variant="secondary"
          //     style={{
          //       textAlign: 'left',
          //       fontSize: '1rem',
          //       padding: '0.5rem',
          //     }}
          //   >
          //     {d.msg}
          //   </Alert>,
          // );
          // 2)
          // console.log('useState result.length : ', result.length);
          //     result[result.length] = (
          //   <Card.Text style={{ textAlign: 'right' }}>
          //     <Alert
          //       key={result.length}
          //       variant="primary"
          //       style={{
          //         textAlign: 'right',
          //         fontSize: '1rem',
          //         padding: '0.5rem',
          //       }}
          //     >
          //       {d.msg}
          //     </Alert>
          //   </Card.Text>
          //     );
          //     setResult(...result);
          //     console.log('ChatContainer result.length : ', result.length);
          //     console.log('ChatContainer result : ', result);
          //   } else {
          //     setMe(false);
          //     result[result.length] = (
          // <Card.Text style={{ textAlign: 'left' }}>
          //   {d.userName}
          //   <Alert
          //     key={result.length}
          //     variant="secondary"
          //     style={{
          //       textAlign: 'left',
          //       fontSize: '1rem',
          //       padding: '0.5rem',
          //     }}
          //   >
          //     {d.msg}
          //   </Alert>
          // </Card.Text>
          //     );
          //     setResult(...result);
          //     console.log('ChatContainer result.length : ', result.length);
          //     console.log('ChatRChatContaineroom result : ', result);
          // $('#chatContents').append(
          //   "<p class='others'>" + d.userName + ' : ' + d.msg + '</p>',
          // );
          // 3) concat
        }
        //새로운 유저가 입장하였을 경우
        else if (d.type === 'open') {
          console.log('---------- open');
          //   if (d.sessionId === sessionId) {
          if (d.sessionId === $('#sessionCode').val()) {
            // $('#chatContents').append(
            //   "<p class='start'>[채팅에 참가하였습니다.]</p>",
            // );
            setResult((result) => [
              ...result,
              {
                me: true,
                msg: '[채팅에 참가하였습니다]',
                userName: 'alert',
              },
            ]);
          } else {
            // $('#chatContents').append(
            //   "<p class='start'>[" +
            //     d.userName +
            //     ']님이 입장하였습니다.' +
            //     '</p>',
            // );
            setResult((result) => [
              ...result,
              {
                me: false,
                msg: '[' + d.userName + ']님이 채팅에 참가하였습니다',
                userName: 'alert',
              },
            ]);
          }
        }
        //유저가 퇴장하였을 경우
        else if (d.type === 'close') {
          console.log('---------- close');
          $('#chatContents').append(
            "<p class='exit'>[" + d.userName + ']님이 퇴장하였습니다.' + '</p>',
          );
        } else {
          console.warn('unknown type!');
        }
      }
    };
  };

  const chatName = () => {
    console.log('chatName');
    if (userName === null || userName.trim() === '') {
      alert('사용자 이름을 입력해주세요.');
      $('#userName').focus();
    } else {
      wsOpen();
      $('#yourName').hide();
      $('#yourMsg').show();
    }
  };

  const keyDown = (e) => {
    if (msg !== '' && e.key === 'Enter') {
      send();
    }
  };

  const send = (e) => {
    console.log('---------- send');
    var obj = {
      type: 'message',
      sessionId: sessionId,
      userName: userName,
      msg: msg,
    };
    //서버에 데이터 전송
    console.log('JSON.stringify(obj) : ', JSON.stringify(obj));
    ws.send(JSON.stringify(obj));
    setMsg('');
  };

  // useEffect
  // 1) 의존성 배열에 종속변수 없을 때 >>> 매번 이벤트 발생
  // 2) 의존성 배열은 있고 종속변수 없을 때 >>> 특정 이벤트 발생
  // 3) 의존성 배열에 특정 종속변수 있을 때 >>> 특정 이벤트 발생
  useEffect(() => {
    console.log('useEffect result : ', result);
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [result]);

  //   const pushMessages = () => {
  //     // const result = [];

  //     result.push(
  // <Card.Text style={{ textAlign: 'right' }}>
  //   <Alert
  //     key={1}
  //     variant="primary"
  //     style={{
  //       textAlign: 'right',
  //       fontSize: '1rem',
  //       padding: '0.5rem',
  //     }}
  //   >
  //     hihi
  //   </Alert>
  // </Card.Text>,
  //     );

  //     return result;
  //   };

  return (
    <>
      <ChatHeader />
      <ChatRoom
        saveMsg={saveMsg}
        sessionId={sessionId}
        result={result}
        keyDown={keyDown}
        msg={msg}
        messageEndRef={messageEndRef}
      />
      {/* <Card className="text-center">
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
                  variant="secondary"
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
        </Card.Body>
        <Card.Footer className="text-muted">
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
      </Card> */}
      <div id="yourName">
        <table class="inputTable">
          <tr>
            <th>닉네임</th>
            <th>
              <input onChange={saveUserName}></input>
            </th>
            <th>
              <button onClick={chatName}>채팅 참가</button>
            </th>
          </tr>
        </table>
      </div>
    </>
  );
};

export default ChatContainer;
