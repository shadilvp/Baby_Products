import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ProductContext } from '../../../Context/Context';
import axios from 'axios';
import Swal from "sweetalert2";
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';



const EditProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, ProductUpdateSchema, setProduct,rating, setRating } = useContext(ProductContext);
  const products = product.find((items) => items.id.toString() === id.toString());
  if (!products) {
    return <div>Loading...</div>;
  }
  return (
<div>
  <Navbar /> {/* Navbar remains outside and keeps its original size */}
  
  <div className="flex">
    <div className="w-48">
      <Sidebar />
    </div>

    <div className="flex-1 flex justify-center items-center h-screen">
      <Formik
        initialValues={{
          name: products.name || '',
          price: products.price || '',
          details: products.details || '',
          category: products.category || '',
          image: products.image || '',
        }}
        validationSchema={ProductUpdateSchema}
        onSubmit={async (values) => {
          try {
              const newupdate = {
                values,
                productrate :rating
              }
              await axios.put(`http://localhost:4000/products/${id}`, values);
              const response = await axios.get('http://localhost:4000/products');
              setProduct(response.data);
              navigate('/allproducts')
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Product Details Updated Successfully",
                showConfirmButton: false,
                timer: 2000
              });
              console.log("edited Values", values);

          } catch (error) {
           console.error("Product is not updated",error);
            
          }
        }}
      >
       
        <Form className="w-full max-w-md bg-white p-6 shadow-lg rounded-md">
        <img 
                src={products.image} 
                alt={products.image} 
                className="w-full h-48 object-contain"
              />
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name: </label>
            <Field type="text" id="name" name="name" className="mt-1 block w-full p-2 border rounded-md"/>
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700">Price: </label>
            <Field type="text" id="price" name="price" className="mt-1 block w-full p-2 border rounded-md"/>
            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Category: </label>
            <Field as="select" id="category" name="category" className="mt-1 block w-full p-2 border rounded-md">
              <option value="">Select Category</option>
              <option value="Toys">Toys</option>
              <option value="Dress">Dress</option>
              <option value="Nutrition">Nutrition</option>
            </Field>
            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Image: </label>
            <Field type="text" id="image" name="image" className="mt-1 block w-full p-2 border rounded-md"/>
            <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
          </div>

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Add
          </button>
        </Form>
      </Formik>
    </div>
  </div>
</div>


  )
}

export default EditProducts


