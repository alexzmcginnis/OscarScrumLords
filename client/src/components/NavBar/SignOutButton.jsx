import React from 'react';
import PropTypes from 'prop-types';

//parent is App.jsx

import axios from 'axios';
/******this all need to be redone */



const SignOutButton = () => {

  const logout = async () => {
    axios.get('/logout');
  };

  return (
    <button onClick={logout}>logout </button>
  );


};


// const SignOutButton = ({ setLoggedIn, setUserObj }) => {

//   const onSuccess = () => {
//     console.log('sucess');
//     setLoggedIn(false);
//     setUserObj({});

//   };

//   const onFailure = () => {
//     console.log('fail');
//     setLoggedIn(true);
//     setUserObj({});
//   };

//   return (
//     <div>
//       <GoogleLogout
//         clientId={'636707500167-jl0be6d4pi4e96ttgqkvt1v0758a3r9p.apps.googleusercontent.com'}
//         buttonText= 'Sign out'
//         onLogoutSuccess={onSuccess}
//         onFailure={onFailure}
//       />
//     </div>
//   );
// };

// SignOutButton.propTypes = {
//   setLoggedIn: PropTypes.func,
//   setUserObj: PropTypes.func,
// };

export default SignOutButton;
