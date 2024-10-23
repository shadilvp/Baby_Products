import React, { useContext, useState } from 'react';
import Navbar from '../Navbar';
import { ProductContext } from '../../../Context/Context';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
  const navigate = useNavigate();
  const { setCatagorys, filteredProducts, HandleDeleteProducts } = useContext(ProductContext);
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

        {/* Filtering the products by category */}
        <button
          onClick={() => setFilterButton(!filterButton)}
          className="absolute top-30 right-8 text-blue-500 hover:text-blue-700 transition-colors duration-300"
        >
          <box-icon name='filter' size="lg"></box-icon>
        </button>
        {filterButton && (
          <div className="absolute top-35 right-9 bg-white shadow-md border border-gray-200 rounded-lg p-4 flex flex-col space-y-2 w-48">
            <button onClick={() => setCatagorys('Default')} className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md">Default</button>
            <button onClick={() => setCatagorys('Toys')} className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md">Toys</button>
            <button onClick={() => setCatagorys('Dress')} className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md">Dress</button>
            <button onClick={() => setCatagorys('Nutrition')} className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md">Nutrition</button>
          </div>
        )}

        <h1 className="text-3xl font-semibold text-gray-800 mb-8">All Products</h1>

        {/* Table layout for products */}
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((items) => (
              <tr key={items.id} className="border-b">
                <td className="py-4 px-4 flex items-center">
                  <img src={items.image} alt={items.name} className="w-16 h-16 object-contain mr-4" />
                  <span className="text-lg font-semibold text-gray-800">{items.name}</span>
                </td>
                <td className="py-4 px-4 text-gray-600">₹ <strong>{items.price}</strong></td>
                <td className="py-4 px-4 text-gray-600">{items.category}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => navigate(`/allproducts/${items.id}`)}
                    className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => HandleDeleteProducts(items.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
