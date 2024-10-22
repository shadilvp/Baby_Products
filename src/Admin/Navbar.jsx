import React, { useContext } from 'react';
import { ProductContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {HandleLogOut} = useContext(ProductContext);
  return (
    <div className="bg-gray-900 text-white flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">Admin Page</h1>
      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        onClick={HandleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
