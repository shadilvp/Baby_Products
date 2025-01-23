import Header from "../Header&footer/Header";
import Footer from "../Header&footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/slices/productSlice";
import { useEffect, useState } from "react";

const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, status, totalPages, currentPage} = useSelector((state) => state.products);
  const [filterButton, setFilterButton] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 20, category: selectedCategory }));
    
  }, [dispatch, currentPage, selectedCategory]);

  // Filter products by category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setFilterButton(false);
  };



  // Pagination functions
  const item = items.filter((item) => item.isDeleted === false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="p-8 relative">
        {/* Filter Button */}
        <button
          onClick={() => setFilterButton(!filterButton)}
          className="absolute top-6 right-8 text-blue-500 hover:text-blue-700 transition-colors duration-300 sm:top-8 sm:right-10"
        >
          <box-icon name="filter" size="lg"></box-icon>
        </button>
  
        {filterButton && (
          <div className="absolute top-12 right-8 bg-white shadow-md border border-gray-200 rounded-lg p-4 flex flex-col space-y-2 w-48 sm:top-16 sm:right-12">
            <button
              onClick={() => handleCategoryFilter('')}
              className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md"
            >
              Default
            </button>
            <button
              onClick={() => handleCategoryFilter('Toys')}
              className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md"
            >
              Toys
            </button>
            <button
              onClick={() => handleCategoryFilter('Dress')}
              className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md"
            >
              Dress
            </button>
            <button
              onClick={() => handleCategoryFilter('Nutrition')}
              className="text-gray-700 hover:bg-blue-100 px-2 py-1 rounded-md"
            >
              Nutrition
            </button>
          </div>
        )}
  
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">All Products</h1>
  
        {status === 'loading' ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {item.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-48 h-48 object-contain mb-4 rounded-lg"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">Price: ₹ <strong>{product.price}</strong></p>
                <p className="text-gray-600 mb-4">Category: {product.category}</p>
                <button
                  onClick={() => navigate(`/shop/${product._id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
  
        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => dispatch(fetchProducts({ page: index + 1, limit: 20, category: selectedCategory }))}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
  
};

export default Shop;





// const Shop = () => {

//     const {product, HandleCart , filterSearchProducts} = useContext(ProductContext);
//     const navigate = useNavigate()

//     if(!product){ 
//         return <h1>No products</h1>
//     }

//     return (
//         <div>
//             <Header />
//             <div className="p-6">
//                 <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    
//                     {/*displayed the product from product context by using map */}
//                      {filterSearchProducts.map((product) => (    
//                         <div key={product.id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
//                             <img 
//                                 src={product.image} 
//                                 alt={product.name} 
//                                 className="w-48 h-48 object-contain mb-4 rounded-lg"
//                             />
//                             <h3 className="text-lg font-semibold text-center mb-2">{product.name}</h3>
//                             <p className="text-gray-600 mb-2 ">Price: ₹ <strong>{product.price}</strong></p>
//                             <p className="text-gray-600 mb-2">Catogory : {product.category}</p>
//                             <button onClick={()=> navigate(`/shop/${product.id}`)}
//                                     className="bg-[#f0c862] text-white px-4 py-2 rounded-lg hover:bg-[#fcc947] transition duration-300"

//                             >
//                                  View details
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };
