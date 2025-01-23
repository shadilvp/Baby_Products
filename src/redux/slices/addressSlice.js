import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load user's addresses
export const loadAddresses = createAsyncThunk(
    "address/loadAddresses",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://baby-products-serverside.onrender.com/api/users/profile/address/${userId}`);
            return response.data.addresses;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Add a new address
export const addAddress = createAsyncThunk(
    "address/addAddress",
    async ({ userId, addressData }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `https://baby-products-serverside.onrender.com/api/users/profile/address/${userId}`,
                addressData
            );
            return response.data.message;  // New address
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const addressSlice = createSlice({
    name: "address",
    initialState: {
        addresses: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadAddresses.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loadAddresses.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.addresses = action.payload;
            })
            .addCase(loadAddresses.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addAddress.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.addresses.push(action.payload);  // Add the new address to the state
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default addressSlice.reducer;
