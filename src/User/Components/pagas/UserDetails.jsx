import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../../../Context/Context';
import { useNavigate } from 'react-router-dom';

const UserDetails = ({ show, toggle }) => {
  const { userDetails, HandleLogOut } = useContext(ProductContext);
  const Email = localStorage.getItem("loginemail");
  const Password = localStorage.getItem("loginpassword")

  const navigate = useNavigate();
  
  const currentUser = userDetails.find(details => details.email === Email && details.password === Password);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const userDetails = document.querySelector('.user-details');
      const userButton = document.querySelector('.user-button');
  
      if (
        show && 
        userDetails && 
        !userDetails.contains(event.target) && 
        userButton && 
        !userButton.contains(event.target)
      ) {
        toggle(); // Close dropdown if clicked outside and not on the button
      }
    };
  
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [show, toggle]);
  

  console.log("UserDetails component rendered with show =", show);

  // UserDetails.jsx
return (
  <div 
    className={`user-details fixed right-4 top-16 w-64 bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ${
      show ? 'block' : 'hidden'
    }`}
    style={{ zIndex: 50, border: '2px solid red' }} // Adding red border for debugging
  >
    {currentUser ? (
      <ul>
        <li key={currentUser.id}>
          <h1 className="font-bold text-lg">{currentUser.name}</h1>
          <h3 className="text-gray-600">{currentUser.email}</h3>
        </li>
        
        <button
          onClick={HandleLogOut}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Log Out
        </button>
      </ul>
    ) : (
      <div>
        No user is found{' '}
        <button
          onClick={() => navigate('/login')}
          className="text-blue-500 hover:underline"
        >
          Login
        </button>
      </div>
    )}
  </div>
);

};

export default UserDetails;
