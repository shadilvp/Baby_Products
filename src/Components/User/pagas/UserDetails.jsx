import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { logout,fetchCurrentUser } from '../../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa" 
import Swal from 'sweetalert2';

const UserDetails = ({ show, toggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(fetchCurrentUser(userId));
    }
  }, [dispatch]);
  

  const handleLogOut = () => {
    dispatch(logout());
    toggle();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User is logged out",
      showConfirmButton: false,
      timer: 3000
    });
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-details') && !event.target.closest('.user-button')) {
        toggle();
      }
    };

    if (show) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [show, toggle]);

  

  return (
    <div
      className={`user-details fixed right-4 top-16 w-[calc(50vh/1)] h-[70vh] bg-[#efd8a8] shadow-lg rounded-lg p-4 transition-all duration-300 ${
        show ? 'block' : 'hidden'
      } sm:w-full sm:h-[50vh] sm:bottom-0 sm:left-0 sm:right-0 sm:top-auto sm:rounded-t-lg`}
      style={{ zIndex: 50 }}
    >
      {user ? (
        <div className="flex flex-col items-center h-full">
          {/* Profile Section */}
          <div className="w-full text-center mb-6">
            <FaUserCircle className="text-6xl text-gray-500 mx-auto" />
            <div className="mt-2 bg-gray-100 p-3 rounded-lg">
              <h1 className="font-bold text-lg">{user.name}</h1>
              <h3 className="text-gray-600">{user.email}</h3>
            </div>
          </div>
  
          {/* Buttons */}
          <div className="mt-auto space-y-4 w-full">
            <button
              onClick={handleLogOut}
              className="w-full border border-transparent px-10 py-4 rounded hover:border-black transition-colors duration-300"
            >
              Log Out
            </button>
            <button
              onClick={() => navigate('/address')}
              className="w-full border border-transparent px-10 py-4 rounded hover:border-black transition-colors duration-300"
            >
              Address
            </button>
            <button
              onClick={() => navigate('/userOrders')}
              className="w-full border border-transparent px-10 py-4 rounded hover:border-black transition-colors duration-300"
            >
              Orders
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>
            No user is found{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
  
  
};

export default UserDetails;
