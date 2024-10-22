import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ProductContext } from '../../Hooks/Context';
import axios from 'axios';
import Swal from "sweetalert2";
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const EditProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, ProductUpdateSchema, setProduct } = useContext(ProductContext);
  const [formValues, setFormValues] = useState({
    name: '',
    price: '',
    details : '',
    category: '',
    image: '',
  });

  const products = product.find((items) => items.id.toString() === id.toString());

  useEffect(() => {
    if (products) {
      setFormValues({
        name: products.name,
        price: products.price,
        details : products.details,
        category: products.category,
        image: products.image,
      });
    }
  }, [products]);

  const HandleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/products/${id}`, formValues);
      setProduct((prevData) => ({ ...prevData, ...formValues }));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Details Updated Successfully",
        showConfirmButton: false,
        timer: 2000
      });
      navigate('/allproducts')
    } catch (error) {
      console.error("Product details are not updated", error);
    }
  }

  return (
    <div className="flex">
      <Sidebar/>
      <div className="flex-1">
        <Navbar />
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate('/allproducts')}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Back to Users
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>
      <Formik
        enableReinitialize
        initialValues={formValues}
        validationSchema={ProductUpdateSchema}
      >
        
          <Form  className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
              <Field
                type="number"
                id="price"
                name="price"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
              />
              <ErrorMessage name="price" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">Product Details</label>
              <Field
                type="text"
                id="details"
                name="details"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setFormValues({ ...formValues, details: e.target.value })}
              />
              <ErrorMessage name="details" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <Field
                as="select"
                id="category"
                name="category"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="Toys">Toys</option>
                <option value="Dress">Dress</option>
                <option value="Nutrition">Nutrition</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
              <Field
                type="text"
                id="image"
                name="image"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setFormValues({ ...formValues, image: e.target.value })}
              />
              <ErrorMessage name="image" component="div" className="text-red-600 text-sm mt-1" />
            </div>
            <button
              type="button"
              onClick={HandleUpdate}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Update
            </button>
          </Form>
        
      </Formik>
    </div>
    </div>
    </div>


  );
};

export default EditProducts;
