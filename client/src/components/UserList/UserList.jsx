import React, {useState, useEffect} from 'react';
import axios from 'axios';
import UserListItem from './UserListItem.jsx';
import VisitProfile from './VisitProfile.jsx';
import styled from 'styled-components';
import { ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';




const UserListStyles = styled.div`
  .fButton {
    background-color: #ffd1dc;
    border: 0px solid black;
    margin-left: 5px;
    margin-right: 5px;
      :hover{
        background-color: lavender;
      }
  }
  .listItem {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .card {
    width: 500px;
    margin: 30px;
    background-color: lavender;
  }
  .userListWrapper {
    display: flex;
    flex-direction: row;
  }
`;



//this component is going to display all of the users.  those users will be so if you click it brings up that users profile.

const UserList = (props) => {

  //inital array is empty
  const [userList, setUserList] = useState([]);
  const [nextUser, setNextUser] = useState(''); //when a user is clicked on to see their profile, a click handler will set this state so the next user is the user clickedo n.  this will trigger a redirect to their profile page
  const [followers, setFollowers] = useState([]); //state of those following user
  const [following, setFollowing] = useState([]); //state of those who user follows




  //this is the fn that will b triggered when selecting a prof page to visit
  const visitUser = async (userId) => {
    //get the userinfo from the db
    const {data: id} = await axios.get(`/routes/userlist/userlist/user/${userId}`);
    setNextUser(id);

  };

  const getFollowing = async () => { //function to retrieve who is following
    const {data} = await axios.get('/routes/userlist/userlist/following');
    setFollowing(data);
    
  };

  const getFollowers = async () => { //function to retrieve who is following
    const {data} = await axios.get('/routes/userlist/userlist/followers');
    setFollowers(data);
    
  };


  const getUsers = async () => {
    try {
      const {data} = await axios.get('/routes/userlist/userlist/allUsers');
      setUserList(data);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    getFollowing();
    getFollowers();
  }, []);



  //create components for following
  const followingList = () => {
    return following.map((person, i) => (
      <ListGroup.Item className="listItem"
        key={i}>{person.followingTarget && person.followingTarget.fullName} 
        <Button
          className='fButton'
          onClick={async()=>{ 
            await axios.delete(`/routes/userList/userList/unfollow/${person.userTarget}`);
            getFollowing();
          }}>unfollow</Button>
      </ListGroup.Item>
    ));
  };

  //create components for followers
  const followersList = () => {
    return followers.map((person, i) => <ListGroup.Item key={i}>{person.followerAdder && person.followerAdder.fullName}</ListGroup.Item>);
  };

  const followPerson = (person) => { //this is a fn to add a person following to the state. to be used in conjunction with the post fn in the child component
    setFollowing(following.concat(person));

  };

  const userListItemCreator = () => {
    return userList.map((user, i) => <UserListItem key={i} user={user} visitUser={visitUser} followPerson={followPerson} getFollowing={getFollowing} />);    
  };

  return (
    <UserListStyles>
      <div className='userListWrapper'>
        <div className='allUsersWrapper'>
          <Card className='card'>
            <h3>Who is Biking?</h3>
            <ListGroup>
              {userListItemCreator()}
            </ListGroup>
          </Card>

        </div>
        <div className='followWrapper'>
          <Card className='card'>
            <h3>Following</h3>
            <ListGroup >
              {followingList()}
            </ListGroup>
          </Card>

          <Card className='card'><h3>followers</h3>
            <ListGroup>
              {followersList()}
            </ListGroup>
          </Card>
        </div>
      </div>
    </UserListStyles>
  );
};

export default UserList;

//      <Route key={i} path={`userList/visitProfile/${user.id}`}></Route>
