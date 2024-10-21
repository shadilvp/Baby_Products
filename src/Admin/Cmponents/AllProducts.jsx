import React, { useContext, useState } from 'react';
import Navbar from '../Navbar';
import { ProductContext } from '../../Hooks/Context';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
  const navigate = useNavigate();
  const { setCatagory, filteredProducts, HandleDeleteProducts} = useContext(ProductContext);
  const [filterButton, setFilterButton] = useState(false);

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
        {/* filtering the products by catagory */}
        <button onClick={()=>setFilterButton(!filterButton)}
          className="absolute top-30 right-8 text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          <box-icon name='filter' size="lg"></box-icon>
        </button>
        {filterButton && (
          <div className="absolute top-35 right-9 bg-white shadow-md border border-gray-200 rounded-lg p-4 flex flex-col space-y-2 w-48">
              <button onClick={()=>setCatagory('Defualt')} className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md">Defualt</button>
              <button onClick={()=>setCatagory('Toys')} className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md">Toys</button>
              <button onClick={()=>setCatagory('Dress')} className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md">Dress</button>
              <button onClick={()=>setCatagory('Nutrition')} className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md">Nutrition</button>

              
          </div>
        )}
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">All Products</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          { filteredProducts.map((items) => (
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
              <div>
              <button 
                  onClick={()=> navigate(`/allproducts/${items.id}`)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    Edit
                  </button>
                  <button 
                  onClick={()=> HandleDeleteProducts(items.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300">
                    Delete
                  </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllProducts;
