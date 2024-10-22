import React, { useContext } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ProductContext } from '../../Hooks/Context';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

// const AddProducts = () => {
//   const { product, ProductUpdateSchema , setProduct} = useContext(ProductContext);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1">
//         <Navbar />
//         <div>
//           <Formik
//             initialValues={{
//               name: "",
//               price: "",
//               category: "",
//               image: "",
//             }}
//             validationSchema={ProductUpdateSchema}
//             onSubmit={async (values) => {
//               try {
//                 const id = String(product.length + 2)
//                 const submit = {...values, id}
//                 console.log("added products",submit)
//                 await axios.post("http://localhost:4000/products", submit)
//                 setProduct((prevProducts) => [...prevProducts, submit]);
//               } catch (error) {
//                 console.error("new item is didnt added", error);
//               }
//             }}
//           >
//             <Form>
//               <div>
//                 <label htmlFor="name">Name: </label>
//                 <Field type="text" id="name" name="name" />
//                 <ErrorMessage name="name" component="div" />
//               </div>
//               <div>
//                 <label htmlFor="price">Price: </label>
//                 <Field type="text" id="price" name="price" />
//                 <ErrorMessage name="price" component="div" />
//               </div>
//               <div>
//                 <label htmlFor="category">Category: </label>
//                 <Field as="select" id="category" name="category">
//                   <option value="">Select Category</option>
//                   <option value="Toys">Toys</option>
//                   <option value="Dress">Dress</option>
//                   <option value="Nutrition">Nutrition</option>
//                 </Field>
//                 <ErrorMessage name="category" component="div" />
//               </div>
//               <div>
//                 <label htmlFor="image">Image: </label>
//                 <Field type="text" id="image" name="image" />
//                 <ErrorMessage name="image" component="div" />
//               </div>
//               <button type="submit">Add</button>
//             </Form>
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddProducts;


const AddProducts = () => {
  const { product, ProductUpdateSchema, setProduct } = useContext(ProductContext);
const navigate = useNavigate()
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
            <Formik
              initialValues={{
                name: "",
                price: "",
                category: "",
                image: "",
              }}
              validationSchema={ProductUpdateSchema}
              onSubmit={async (values) => {
                try {
                  const id = String(product.length + 2);
                  const submit = { ...values, id };
                  console.log("added products", submit);
                  await axios.post("http://localhost:4000/products", submit);
                  setProduct((prevProducts) => [...prevProducts, submit]);
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "new Product added Successfully",
                    showConfirmButton: false,
                    timer: 2000
                  });
                  navigate('/allproducts')
                } catch (error) {
                  console.error("new item is didn't add", error);
                }
              }}
            >
              <Form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                  <Field
                    type="text"
                    id="price"
                    name="price"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                  <Field
                    as="select"
                    id="category"
                    name="category"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Toys">Toys</option>
                    <option value="Dress">Dress</option>
                    <option value="Nutrition">Nutrition</option>
                  </Field>
                  <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL:</label>
                  <Field
                    type="text"
                    id="image"
                    name="image"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;



