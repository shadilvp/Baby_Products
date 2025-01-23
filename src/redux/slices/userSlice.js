import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://baby-products-serverside.onrender.com/api/register', userData);
      return response.data; 
    } catch (error) {
      console.log(error.response);
      
      return rejectWithValue(error.response.data);
    }
  }
);

export  const loginUser = createAsyncThunk(
  'user/login',
  async (userData,{rejectWithValue}) => {
    try {
      const response = await axios.post('https://baby-products-serverside.onrender.com/api/login',userData);
      console.log(response.data)
      const user = response.data.data;
      const accessToken = response.data.accessToken;
      localStorage.setItem('userId',user._id);
      localStorage.setItem('roll',user.roll);
      localStorage.setItem('accessToken',accessToken);
      return response.data.data; 
      
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "user/currentUser",
  async (userId,{rejectWithValue}) => {
    try {
      const response = await axios.get(`https://baby-products-serverside.onrender.com/api/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchSpecificUser = createAsyncThunk(
  "admin/specificUser",
  async (userId,{rejectWithValue}) => {
    try {
      const response = await axios.get(`https://baby-products-serverside.onrender.com/api/admin/users/${userId}`);
      
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);


export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://baby-products-serverside.onrender.com/api/admin/users');
            console.log("all users", response.data.users)
            return response.data.users
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUserTemp = createAsyncThunk(
  "admin/deleteUserTemp",
  async (userId,{rejectWithValue}) => {
    try {
      const response = await axios.delete(`https://baby-products-serverside.onrender.com/api/admin/users/${userId}/delete`);
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'An error occurred');
    }

  }
);

export const deleteUserPermanently = createAsyncThunk(
  "admin/deleteUserPermanently",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://baby-products-serverside.onrender.com/api/admin/users/${userId}/delete-permenently`);
      return userId;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'An error occurred');
    }
  }
);

export const blockUser = createAsyncThunk(
  "admin/userBlock",
  async (userId,{rejectWithValue}) => {
    try {
      const response = await axios.patch(`https://baby-products-serverside.onrender.com/api/admin/users/${userId}/block`);
      console.log("object",response.data.user)
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'An error occurred');
    }

  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false, error: null, items:[],status:"idle", specificUser:null},
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
    //register user
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.message = action.payload.message;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || 'An error occurred';
      state.message = null;
    })

    //login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //allUsers
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        console.log(action.payload)
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      //currentUser
      .addCase(fetchCurrentUser.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state,action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //specific user
      .addCase(fetchSpecificUser.pending, (state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpecificUser.fulfilled, (state,action) => {
        state.loading = false;
        state.specificUser = action.payload;
      })
      .addCase(fetchSpecificUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //soft delete user 
      .addCase(deleteUserTemp.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserTemp.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItems = state.items.filter(user => user._id !== action.payload._id);
        state.items = updatedItems;
      })
      .addCase(deleteUserTemp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //deleteuser
      .addCase(deleteUserPermanently.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserPermanently.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItems = state.items.filter(user => user._id !== action.payload);
        state.items = updatedItems;
      })
      .addCase(deleteUserPermanently.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //block user
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItems = state.items.filter(user => user._id !== action.payload._id);
        state.items = updatedItems;
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const {logout, clearMessage} = userSlice.actions
export default userSlice.reducer;




