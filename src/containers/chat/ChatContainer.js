import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery'; // npm i jquery
import ChatHeader from '../../components/chat/ChatHeader';
import ChatRoom from '../../components/chat/ChatRoom';
import { Alert, Button, Card } from 'react-bootstrap';
// npm install @stomp/stompjs
// npm install sockjs-client
// 버전 문제시 --force 붙혀준다

var ws;
const result = [];

const ChatContainer = () => {
  window.$ = $;
  // var ws;
  const [sessionId, setSessionId] = useState('');
  const [userName, setUserName] = useState('');
  const [msg, setMsg] = useState('');
  const saveSessionId = (event) => {
    setSessionId(event.target.value);
  };

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
          if (d.sessionId === $('#sessionCode').val()) {
            $('#chatContents').append("<p class='me'>" + d.msg + '</p>');
          } else {
            $('#chatContents').append(
              "<p class='others'>" + d.userName + ' : ' + d.msg + '</p>',
            );
          }
        }
        //새로운 유저가 입장하였을 경우
        else if (d.type === 'open') {
          console.log('---------- open');
          //   if (d.sessionId === sessionId) {
          if (d.sessionId === $('#sessionCode').val()) {
            $('#chatContents').append(
              "<p class='start'>[채팅에 참가하였습니다.]</p>",
            );
          } else {
            $('#chatContents').append(
              "<p class='start'>[" +
                d.userName +
                ']님이 입장하였습니다.' +
                '</p>',
            );
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

    document.addEventListener('keypress', function (e) {
      //   console.log('addEventListener : ', e);
      if (e.keyCode === 13) {
        //enter press
        send();
      }
    });
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

  const send = () => {
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
  };

  useEffect(() => {
    console.log('useEffect');
  }, [result]);

  const pushMessages = () => {
    // const result = [];

    result.push(
      <Card.Text style={{ textAlign: 'right' }}>
        <Alert
          key={1}
          variant="primary"
          style={{
            textAlign: 'right',
            fontSize: '1rem',
            padding: '0.5rem',
          }}
        >
          hihi
        </Alert>
      </Card.Text>,
    );

    return result;
  };

  return (
    <>
      <ChatHeader />
      <ChatRoom
        saveMsg={saveMsg}
        sessionId={sessionId}
        result={result}
        send={send}
      />
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
