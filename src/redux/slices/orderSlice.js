import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to create an order
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async ({ userId, address },{rejectWithValue}) => {
        try {
            console.log("id",userId)
        const response = await axios.post(`http://localhost:4000/api/users/orders/${userId}`, { address });
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
            const response = await axios.get(`http://localhost:4000/api/users/orders/${userId}`);
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
            const response = await axios.get("http://localhost:4000/api/users/Orders/allOrders");
            return response.data.orders
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);

        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: null,
        error: null,
        specificOrder : [],
        allOrders: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        //fetching specific
            .addCase(fetchUserOrders.pending, (state)=>{
                state.loading = true;
                state.error = null;
                console.log("a")
            })
            .addCase(fetchUserOrders.fulfilled, (state,action) => {
                // console.log("Action Payload:", action.payload);
                state.loading = false;
                state.specificOrder = action.payload;
                // console.log("b") 
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("c")
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
            });
    }
});

export default orderSlice.reducer;
