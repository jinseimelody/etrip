import io from 'socket.io-client';
import {FaRegPaperPlane} from 'react-icons/fa';
import './sample.scss';
import {useEffect, useState} from 'react';

const socket = io.connect('https://m.coetorise.com');
const Sample = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessages(prev => [...prev, data.message]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, messages]);

  const sendMessage = () => {
    socket.emit('send_message', {message: input});
    setMessages(prev => [...prev, input]);
  };
  return (
    <div className="sample">
      <div className="title my-3">Socket.io sample</div>
      <div className="chat">
        <div className="chat__header">
          <input
            type="text"
            onChange={e => {
              setInput(e.target.value);
            }}
          />
          <button
            onClick={() => {
              sendMessage();
            }}>
            <FaRegPaperPlane />
          </button>
        </div>
        <div className="chat__body">
          {messages.map(m => (
            <div className="line">
              <div className="message message--left">{m}</div>
            </div>
          ))}
          {/* <div className="line">
            <div className="message message--left">Hello there!</div>
          </div>
          <div className="line">
            <div className="message message--right">Hi</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Sample;
