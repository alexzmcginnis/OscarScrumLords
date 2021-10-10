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
    display: flex;
    flex-direction: column;
    
  }

  .msg {
    padding: 5px;
    border: 0px solid grey;
    border-radius: 3px;
    margin: 5px;
    width: fit-content;
    height: fit-content;

  }

  #msgFootnote {
    font-size: 12px;
    text-align: right;
  }
  
  #user {
    background-color: pink;
 
    align-self: flex-end;
  }
  #others {
    background-color: lavender;
    margin-right: 70px;
    align-self: flex-start;
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
          >{message.message}
          <p id='msgFootnote'>{message.username}</p>
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
