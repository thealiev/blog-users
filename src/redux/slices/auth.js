import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (userData, {rejectWithValue}) => {
      try{
        if(userData.username){
            const {data} = await axios.post('/auth/register', userData)
            localStorage.setItem('token', data.token)
            return data
        } else {
            const {data} = await axios.post('/auth/login', userData)
            localStorage.setItem('token', data.token)
            return data
        }
      } catch(err) {
        rejectWithValue(err)
      } 


    }
)

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchUserData',
    async (__, {rejectWithValue}) => {
      try{
       const {data} = await axios.get('/auth/me')
       return data
      } catch(err) {
        rejectWithValue(err)
      } 


    }
)

const initialState = {
    isAuth: false,
    user: null,
    error: null,
    isLoading:false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoading = false
            state.isAuth = false;
            state.user = {};
            localStorage.removeItem('token')
        }
    },
    extraReducers:{
        [fetchUserData.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchUserData.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.user = action.payload;
            localStorage.setItem('token', action.payload.token)
            
        },
        [fetchUserData.rejected]: (state) => {
            state.isLoading = false;
            state.error = 'error';
        },
        [fetchAuthMe.pending]: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            if(action.payload._id) {
                state.isAuth = true;
            }
            state.user = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => {
            state.isLoading = false;
            state.error = 'error';
        }
    }
})

export const {logout} = authSlice.actions
export default authSlice.reducer
