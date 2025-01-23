import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to create an order
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async ({ userId, address },{rejectWithValue}) => {
        try {
            console.log("id",userId)
        const response = await axios.post(`https://baby-products-serverside.onrender.com/api/users/orders/${userId}`, { address });
        return response.data;
        } catch(error) {
            console.error("Order API Error:", error.response || error.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchUserOrders = createAsyncThunk(
    'order/fetchUserOrders',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://baby-products-serverside.onrender.com/api/users/orders/${userId}`);
            return response.data.orders;
        } catch (error) {
            console.error("Fetch Orders API Error:", error.response || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchingAllOrders = createAsyncThunk(
    "admin/orders",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get("https://baby-products-serverside.onrender.com/api/users/Orders/allOrders");
            return response.data.orders
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);

        }
    }
);

export const createRazorpayOrder = createAsyncThunk(
    'order/createRazorpayOrder',
    async ({ userId,  totalAmount }, { rejectWithValue }) => {
        try {
            console.log("totalAmount",totalAmount)
            console.log("userId",userId)
            const response = await axios.post(`https://baby-products-serverside.onrender.com/api/users/razorpay/order/${userId}`,
                {  totalAmount }
            );
            return response.data;
        } catch (error) {
            console.error("Razorpay Order Error:", error.response || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const razorPayPayment = createAsyncThunk(
    "razorpay/payment",
    async ({userId, address, orderId, paymentId, signature},{rejectWithValue}) => {
        try {
        const response = await axios.post(`https://baby-products-serverside.onrender.com/api/users/razorpay/payment/${userId}`,
            {address, orderId, paymentId, signature}
        );
        return response.data;
      } catch (error) {
        console.error("Razorpay Order Error:", error.response || error.message);
        return rejectWithValue(error.response?.data || error.message);
      }  
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        error: null,
        specificOrder : [],
        allOrders: [],
        loading: false,
        razorpayOrder: null,
        paymentSuccess:null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        //fetching specific
            .addCase(fetchUserOrders.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state,action) => {
                state.loading = false;
                state.specificOrder = action.payload;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //creating a order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //fetching all orders
            .addCase(fetchingAllOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchingAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.allOrders = action.payload;
            })
            .addCase(fetchingAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            
            //razorPay
            .addCase(createRazorpayOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRazorpayOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.razorpayOrder = action.payload;
            })
            .addCase(createRazorpayOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            //razorpayPayment
            .addCase(razorPayPayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(razorPayPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(razorPayPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;

