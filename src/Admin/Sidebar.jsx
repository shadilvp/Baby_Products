import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li className="mb-2">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/users" className="hover:underline">Users</Link>
        </li>
        <li className="mb-2">
          <Link to="/editproducts" className="hover:underline">Add Product</Link>
        </li>
        <li>
          <Link to="/allproducts" className="hover:underline">All Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
