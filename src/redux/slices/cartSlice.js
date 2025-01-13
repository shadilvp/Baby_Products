import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  for adding an item to the cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity ,accessToken}, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/users/cart/${userId}`, 
              { productId, quantity },
              {
                headers: {
                  "Authorization": `Bearer ${accessToken}`, 
                },
              }
          );
            console.log("addedItem", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



//  for getting the current user's cart
export const currentUserCart = createAsyncThunk(
    "cart/usercart",
    
    async (userId,{rejectWithValue}) => { 
        try {
            const response = await axios.get(`http://localhost:4000/api/users/cart/${userId}`);
            return response.data.cart // Return the current cart from the response
        } catch (error) {
            return rejectWithValue(error.response.data.message);  
        }
    }
);

//  for updating the quantity of a product in the cart (increase/decrease)
export const updateCartQuantity = createAsyncThunk(
    "cart/updateQuantity",
    async ({ productId, action }, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const response = await axios.post(
                `http://localhost:4000/api/users/cart-quantity`,
                { productId, action },
                {
                  headers: {
                    "Authorization": `Bearer ${accessToken}`, 
                  },
                }
            );
            console.log("Updated cart", response.data.message);
            return response.data.message.items; // Return updated cart items
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

//  for removing a product from the cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ productId }, { rejectWithValue }) => {
        try {
          const accessToken = localStorage.getItem("accessToken")
            const response = await axios.post(
                "http://localhost:4000/api/users/cart",
                { productId },
                {
                  headers: {
                    "Authorization": `Bearer ${accessToken}`, 
                  },
                }
            );
            console.log("Removed from cart", response.data.cart);
            return response.data.cart.items; // Return updated cart items
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],  
        status: "idle", 
        error: null,
        user:[],
        totalAmount : 0
    },
    reducers: {
        // addProductToCart: (state, action) => {
        //     const product = action.payload;
        //     state.items.push(product);
        // },
        // removeProductFromCart: (state, action) => {
        //     const productId = action.payload;
        //     state.items = state.items.filter(item => item.productId !== productId);
        // },
    },
    extraReducers: (builder) => {
        builder
            // For adding an item to the cart
            .addCase(addToCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            
            // For getting current user's cart
            .addCase(currentUserCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(currentUserCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(currentUserCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            
            // For updating cart quantity
            .addCase(updateCartQuantity.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload; 
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            
            // For removing product from cart
            .addCase(removeFromCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                console.log(action.payload,"payload")
                console.log(state.items,"items")
                state.items = action.payload;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;
