import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import Chat from './Chat.jsx';

const socket = io.connect('http://localhost:3001');

const ChatRoom = () => {

  //const [fullName, setFullName] = useState('')
  const [message, setMessage] = useState({ message: ''});
  const [roomMessages, setRoomMessages] = useState([]);

  //for selecting a room
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  

  useEffect(() => {
    socket.on('message', (message) => {
      console.log('here', message);
      console.log(roomMessages);
      setRoomMessages([...roomMessages, message]);
    });
  });

  // const changeMessage = e => setMessage(e.target.value)
  const changeMessage = (e) => setMessage({...message, message: e.target.value});
  
  const submitMessage = (e) => {
    socket.emit('message', { message} );
    setMessage({message: ''});

  };


  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('joinRoom', room);
    }
  };

  const chatComponents = () => {
    return roomMessages.map(({ message}, i) => (
      <div key={i}>
        message: {message}
      </div>
    ));
  };

  return (
    <div>chat room
      <div>chat rooms available

        <input 
          type="text"
          onChange={e => setUsername(e.target.value)}
          placeholder='username'
          value={username}
        /> 

        <input 
          type="text"
          onChange={e => setRoom(e.target.value)}
          placeholder='roomname'
          value={room}
        /> 
      
        <button onClick={joinRoom}>send</button>

      </div>

      
      message: 
      <input 
        type="text"
        onChange={e => changeMessage(e, 'message')}
        value={message.message}
      /> 
      
      <button onClick={submitMessage}>send</button>

      <div>

        <Chat socket={socket} username={username} room={room} />

      </div>
    
    </div>
  );
};

export default ChatRoom;
