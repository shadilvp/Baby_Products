import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDashboardData = createAsyncThunk(
    "admin/dashboard",
    async (_,{rejectWithValue}) => {
        try {
            const response = await axios.get("https://baby-products-serverside.onrender.com/api/admin/dashboard",{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || 'An error occurred');
        }        
    }
);

const adminSlice = createSlice({
    name : "admin",
    initialState : {
        totalUsers : 0,
        totalProducts : 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalPurchased: 0,
        loading: false,
        error: null,
    } ,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(fetchDashboardData.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchDashboardData.fulfilled, (state, action) => {
            state.loading = false;
            const { totalUsers, totalProducts, totalOrders, totalRevenue, totalPurchased } = action.payload;
            state.totalUsers = totalUsers;
            state.totalProducts = totalProducts;
            state.totalOrders = totalOrders;
            state.totalRevenue = totalRevenue;
            state.totalPurchased = totalPurchased;
        })
        .addCase(fetchDashboardData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default adminSlice.reducer;