import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Asynchronous action to fetch products with pagination


export const addNewProduct  = createAsyncThunk(
  "admin/addProduct",
  async (newProduct, {rejectWithValue}) => {
    try {
      console.log("reached",newProduct)
      const response = await axios.post("http://localhost:4000/api/admin/addproduct",newProduct)
      console.log("added",response.data)
      return response.data.newProduct
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);


export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, limit = 20 , catagory="" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/admin/products?page=${page}&limit=${limit}&category=${catagory}`
      );      
      return {
        products: response.data.products,
        totalProducts: response.data.totalProducts,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
     // Assume your API returns the total number of products
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSpecificProduct = createAsyncThunk(
    "product/fetchSpecificProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/users/products/${productId}`);
            return response.data.message; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editProduct = createAsyncThunk(
  "admin/editProduct",
  async ({productId, values},{rejectWithValue}) => {
  try {
    const response = await axios.patch(`http://localhost:4000/api/admin/products/${productId}/edit`, values);
    return response.data.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }    
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId,{rejectWithValue}) => {
    const response = await axios.delete(`http://localhost:4000/api/admin/product-delete/${productId}`)
    return response.data.data
  }
)


const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    product:null,
    searchItems: "", 
    status: "idle",
    error: null,
    totalProducts: 0,
    totalPages:0,
    currentPage:1 
  },
  reducers: {
    // Action to update the search query
    setSearchItems(state, action) {
      state.searchItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    // Add new product lifecycle
      .addCase(addNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload); // Add the new product to the list
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // When fetching products 
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products; 
        state.totalProducts = action.payload.totalProducts; 
        state.totalPages = action.payload.totalPages; 
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSpecificProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecificProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload; // Set the specific product
      })
      .addCase(fetchSpecificProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Edit product
      .addCase(editProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });;
  },
});

export const { setSearchItems } = productSlice.actions;
export default productSlice.reducer;
