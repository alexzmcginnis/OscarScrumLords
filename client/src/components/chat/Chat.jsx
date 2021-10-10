import React, {useState, useEffect} from 'react';
import { Button, Card} from 'react-bootstrap';
import styled from 'styled-components';

const StyledChat = styled.div`
  .messages {
    background-color: white;
    border: 1px grey solid;
    border-radius: 5px;
    height: 400px;
    width: 600px;
  }

  .msg {
    padding: 5px;
    border: 0px solid grey;
    border-radius: 3px;
    margin: 5px;

  }
  
  #user {
    background-color: pink;
    margin-left: 70px;
    text-align: right;
  }
  #others {
    background-color: lavender;
    margin-right: 70px;
  }
`;

const Chat = ({socket, username, room}) => {



  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);



  const sendMessage = async () => {
    if (message) {
      const messageObj = {
        room: room,
        username: username,
        message: message,
        
      };

      await socket.emit('message', messageObj);
      setAllMessages(list => [...list, messageObj]);
      setMessage('');
     

    }
  };

  useEffect(() => {
    socket.on('receivedMessage', (data) => {
      setAllMessages ((list) => [...list, data]);
      console.log('all messages', allMessages);
  
    });
  }, [socket]);


  return (
    <StyledChat>
      <div>
        <div>
          <p>CurrentTopic:{room} </p>
        </div>
        <div className='messages'>
          {allMessages.map((message, i) =>( <div 
            key={i} 
            className = 'msg'
            id={message.username === username
              ? 'user'
              : 'others'}
          >user: {message.username}  message: {message.message}
          </div>))}
        </div>
        <div className='interaction'>
          <input type='text' placeholder='message text' onChange={e => setMessage(e.target.value)} value={message} />
          <Button className='fButton' onClick={sendMessage} >send</Button>
        </div>
      </div>
    </StyledChat>
  );
};

export default Chat;
