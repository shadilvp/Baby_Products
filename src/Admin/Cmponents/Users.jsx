import React, { useContext } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { ProductContext } from '../../Hooks/Context';
import { useNavigate } from 'react-router-dom';


const Users = () => {
  const { userDetails,HandleDeleteUser } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">User List</h1>
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {userDetails
              .filter((user) => user.email !== 'admin@1234')
              .map((user) => (
                <li
                  key={user.id}
                  className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <box-icon name='user' type='solid' animation='tada' rotate='180' className="text-blue-500"></box-icon>
                    <div className="text-gray-700 font-medium">{user.id}</div>
                  </div>
                  <div className="text-gray-800 font-semibold">Name: {user.name}</div>
                  <div className="flex items-center gap-1 text-gray-600"><box-icon name='envelope' animation='tada' ></box-icon>{user.email}</div>
                  <button 
                  onClick={()=> navigate(`/users/${user.id}`)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    View
                  </button>
                  <button 
                  onClick={()=> HandleDeleteUser(user.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300">
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Users;
