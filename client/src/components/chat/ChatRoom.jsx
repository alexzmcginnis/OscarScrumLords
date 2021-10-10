import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import Chat from './Chat.jsx';
import axios from 'axios';
import styled from 'styled-components';
import { Card, Button, DropdownButton, Dropdown} from 'react-bootstrap';

const aws = false;
const deployedDNS = '';
const host = aws === true
  ? deployedDNS
  : 'localhost';


const socket = io.connect(`http://${host}:3001`);

const StyledRoom = styled.div`
  .buttonWrapper {
    display: flex;
    flex-direction: row;
  }
  .heading {
  background-color: white;
  border: 1px solid grey;
  border-radius: 4px;
  margin: 10px;
  }
  .click {
    margin: 10px;
  }
`;

const ChatRoom = () => {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const [currentUser, setCurrentUser] = useState({}); //get this when enter room
  
  useEffect(async ()=> { //on mount get the user info
    const {data} = await axios.get('/routes/profile');
    setCurrentUser[data];
    const userName = data
      ? data.fullName
      : 'anonymous';
    setUsername(userName);
    //data && setUsername(data.fullName)

  }, []); 
  



  // const changeMessage = e => setMessage(e.target.value)
  const changeMessage = (e) => setMessage({...message, message: e.target.value});
  



  const joinRoom = () => {
    setShowChat(true);
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

  const selectRoom = (e) => {
    console.log('e', e);
    setRoom(e);
    
  };

  return (
    <StyledRoom>
      <div>
        <Card className='heading'>
          <h3>Welcome, {username}.  Please select a topic and chat!</h3>
        </Card>

        <div className='buttonWrapper'>
          <DropdownButton
            onSelect={selectRoom}
         
            title='what do you want to discuss'
            className='dropdown click'
          >
            <Dropdown.Item eventKey="bikes">Bikes</Dropdown.Item>
            <Dropdown.Item eventKey='whereToRide'>Where to ride</Dropdown.Item>
            <Dropdown.Item eventKey='general'>General</Dropdown.Item>

          </DropdownButton>

    
      
          <Button className='fButton click' onClick={joinRoom}>Chat!</Button>


        </div>
    
      </div>
   

      
  
      <div>
        {showChat && <Chat socket={socket} username={username} room={room} />}
       

      </div>
    
    </StyledRoom>
  );
};

export default ChatRoom;
