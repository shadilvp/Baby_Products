import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import addressReducer from "./slices/addressSlice";
import adminReducer from "./slices/adminSlice";
import orderReducer from './slices/orderSlice'
const store = configureStore({
    reducer: {
        user : userReducer,
        products : productReducer,
        cart : cartReducer,
        address : addressReducer,
        admin : adminReducer,
        order:orderReducer
    },
});

export default store;