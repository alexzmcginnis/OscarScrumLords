import React, {useState, useEffect} from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './Map/Map.jsx';
import Calendars from './NavBar/Events/Calendars.jsx';
import UserProfile from './NavBar/UserProfile.jsx';
import Home from './NavBar/Home.jsx';
import SignInButton from './NavBar/SignInButton.jsx';
import SignOutButton from './NavBar/SignOutButton.jsx';
import UserList from './UserList/UserList.jsx';
import VisitProfile from './UserList/VisitProfile.jsx';
import SendMessage from './Messages/SendMessage.jsx';
import Inbox from './Messages/Inbox.jsx';
import ChatRoom from './chat/ChatRoom.jsx';

import BikeRegistry from './NavBar/BikeRegistry.jsx';

import axios from 'axios';




const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState({});
  const [events, setEvents] = useState([]);
  const [landmarks, setLandmarks] = useState([]);


  const createUser = (newUser) => {
  
  };

  /**this function returns data, next need to use it to update the state of the app */
  const getUser = async () => {
    try {
      const {data} = await axios.get('/routes/profile');
      setUserObj(data);
      if (data.id) {
        setLoggedIn(true);
      }
    } catch (err) {
      console.log('getUSer err', err);
    }
  };

  const createEvent = (eventObj) => {
    const {name: hostName} = userObj;
    const postObj = {
      ...eventObj,
      hostName,
    };
    axios.post('/routes/routes/events', postObj)
      .then(getEvents);
  };

  const putEvent = (eventId) => {
    const { googleId, name: fullName } = userObj;
    axios.put('/routes/routes/events', {eventId, googleId, fullName})
      .then(getEvents(userObj));
  };

  const getEvents = () => {
    axios.get('/routes/routes/events')
      .then(({data}) => {
        data.forEach(event => {
          event.lat = Number(event.lat);
          event.lng = Number(event.lng);
          event.time = new Date();
          event.kind = 'event';
        });        
        setEvents(data);
      });
  };

  const createLandmark = (eventObj) => {
    const {name: fullName} = userObj;
    const postObj = {
      ...eventObj,
      fullName,
    };
    axios.post('/routes/routes/landmarks', postObj)
      .then(getLandmarks);
  };

  const getLandmarks = () => {
    axios.get('/routes/routes/landmarks')
      .then(({data}) => {
        data.forEach(event => {
          event.lat = Number(event.lat);
          event.lng = Number(event.lng);
          event.time = new Date();
        });
        setLandmarks(data);
      });
  };


  useEffect(() => {
    getEvents();
    getLandmarks();
    getUser();
  }, []);

  return (
    <div>
      <header>
        <h1>Bike Around and Find Out</h1>
        <h3>New Orleans Interactive Community Bike Map</h3>
      </header>
      <Router>
        <nav>
          <ul className ='navbar' >
            <li><Link to='/home' >Home</Link></li>
            <li><Link to='/map' >Map</Link></li>
            <li><Link to='/calendar' >Events</Link></li>
            <li><Link to='/userProfile'>My Profile</Link></li>
            <li><Link to='/userList'>User List</Link></li>
            <li><Link to='/registry'>Bike Registry</Link></li>
            <li><Link to='/inbox'>Inbox</Link></li>
            <li><Link to='/chatroom'>Chat</Link></li>


            <li>{loggedIn ?
              `Hello ${userObj.givenName}` :
              'Please Sign in!'
            }</li>
            <li>
              {loggedIn ?
                <SignOutButton setLoggedIn={setLoggedIn} setUserObj={setUserObj}/> :
                <SignInButton setLoggedIn={setLoggedIn} createUser={createUser} />
              }</li>
          </ul>
          <br/>
        </nav>
        <main>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/home'><Home />
            </Route>
            <Route path='/calendar'>
              <Calendars
                // events={events}
                // setEvents={setEvents}
                // createEvent={createEvent}
              />
            </Route>
            <Route path='/userProfile'>
              <UserProfile
                userObj={userObj}
                events={events}
                getUser={getUser}
                // attending={attending}
              />
            </Route>
            <Route path='/map'>
              <Map
                events={events}
                setEvents={setEvents}
                createEvent={createEvent}
                putEvent={putEvent}
                landmarks={landmarks}
                setLandmarks={setLandmarks}
                createLandmark={createLandmark}
                userObj={userObj}
                loggedIn={loggedIn}/>
            </Route>
            <Route path='/userList'>
              <UserList />
            </Route>
            <Route path='/visitProfile/:id'>
              <VisitProfile />
            </Route>
            <Route path='/sendMessage/:id'>
              <SendMessage />
            </Route>
            <Route path='/inbox'>
              <Inbox />
            </Route>
         
            <Route path='/registry'>
              <BikeRegistry />
            </Route>

            <Route path='/chatroom'>
              <ChatRoom />
            </Route>


          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;

//{nextUser ? <Redirect to='/visitProfile' /> : <UserList />}
