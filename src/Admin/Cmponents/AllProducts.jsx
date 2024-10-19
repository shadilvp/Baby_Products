import React, { useContext } from 'react';
import Navbar from '../Navbar';
import { ProductContext } from '../../Hooks/Context';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
  const navigate = useNavigate();
  const { product } = useContext(ProductContext);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-300"
        >
          &lt; Back
        </button>
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">All Products</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {product.map((items) => (
            <li 
              key={items.id} 
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src={items.image} 
                alt={items.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{items.name}</h3>
                <p className="text-gray-600">Price: ₹ <strong>{items.price}</strong></p>
                <p className="text-gray-600">Category: {items.category}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllProducts;
