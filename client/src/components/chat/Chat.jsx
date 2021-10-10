import React, {useState, useEffect} from 'react';

const Chat = ({socket, username, room}) => {

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message) {
      const messageObj = {
        room: room,
        username: username,
        message: message,
        
      };

      await socket.emit('message', messageObj);
    }
  };

  useEffect(() => {
    socket.on('receivedMessage', (data) => {
      console.log('data', data);
    });
  }, [socket]);


  return (
    <div>
      <div>
        <p>chatroom {room} </p>
      </div>
      <div className='messages'></div>
      <div className='interaction'>
        <input type='text' placeholder='message text' onChange={e => setMessage(event.target.value)} />
        <button onClick={sendMessage} >send</button>
      </div>
    </div>
  );
};

export default Chat;
