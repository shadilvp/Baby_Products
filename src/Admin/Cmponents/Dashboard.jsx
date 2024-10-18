import React, { useContext } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { ProductContext } from '../../Hooks/Context';

const Dashboard = () => {
  const {product, userDetails,allOrders, totalAmountSum} = useContext(ProductContext)
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Total Products</h2>
              <p className="text-2xl mt-2">{product.length}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Total Orders</h2>
              <p className="text-2xl mt-2">{allOrders.length}</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Users</h2>
              <p className="text-2xl mt-2">{userDetails.filter((user) => user.email !== "admin@1234").length}</p>
            </div>
            <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Earnings</h2>
              <p className="text-2xl mt-2">${totalAmountSum}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
