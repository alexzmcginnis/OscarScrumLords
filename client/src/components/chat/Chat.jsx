import React, {useState, useEffect} from 'react';

const Chat = ({socket, username, room}) => {

  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [messageList, setMessageList] = useState([]);


  const sendMessage = async () => {
    if (message) {
      const messageObj = {
        room: room,
        username: username,
        message: message,
        
      };

      await socket.emit('message', messageObj);
      setSentMessages(list => [...list, messageObj]);
      setAllMessages(list => [...list, messageObj])
      setMessage('')
     

    }
  };

  useEffect(() => {
    socket.on('receivedMessage', (data) => {
      setAllMessages ((list) => [...list, data]);
  
    });
  }, [socket]);


  return (
    <div>
      <div>
        <p>chatroom {room} </p>
      </div>
      <div className='messages'>
        {allMessages.map((message, i) => <div key={i} >user: {message.username}  message: {message.message}</div>)}
      </div>
      <div className='interaction'>
        <input type='text' placeholder='message text' onChange={e => setMessage(event.target.value)} />
        <button onClick={sendMessage} >send</button>
      </div>
    </div>
  );
};

export default Chat;
