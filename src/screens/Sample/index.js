import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';
import {FaRegPaperPlane} from 'react-icons/fa';
import {IoIosArrowBack} from 'react-icons/io';
import classNames from 'classnames';

import './sample.scss';
import {Nav} from '~/components';

// const socket = io('https://m.coetorise.com');
const Sample = () => {
  const messageRef = useRef();
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   socket.on('message', data => {
  //     setMessages(prev => [...prev, {type: 'receive', message: data.message}]);
  //   });
  // }, [socket]);

  const sendMessage = _ => {
    const message = messageRef.current.value;
    if (message === '') return;

    messageRef.current.value = '';
    setMessages(prev => {
      // socket.emit('message', {message});
      return [...prev, {type: 'send', message}];
    });
  };

  return (
    <>
      <Nav>
        <Link to="/search">
          <Nav.NavItem>
            <IoIosArrowBack /> Trip search
          </Nav.NavItem>
        </Link>
      </Nav>
      <div className="sample">
        <div className="text-heading my-3">Socket.io sample</div>
        <div className="chat">
          <div className="chat__header">
            <input
              ref={messageRef}
              type="text"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage}>
              <FaRegPaperPlane />
            </button>
          </div>
          <div className="chat__body">
            {messages &&
              messages.map((v, i) => (
                <div key={i} className="line">
                  <div
                    className={classNames('message', {
                      'message--left': v.type === 'receive',
                      'message--right': v.type === 'send'
                    })}>
                    {v.message}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Sample;
