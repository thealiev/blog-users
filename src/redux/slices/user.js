import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../api/axios'

export const addFriend = createAsyncThunk(
    'user/addFriend',
    async ({userId, friendId}) => {
        const {data} = await axios.post(`/user/${userId}/friends`, {
            friendId
        });
        return data
    }
)



const initialState = {
    isLoading: false,
    friends: []
}

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [addFriend.pending]: (state) => {
      state.isLoading = true;
    },
    [addFriend.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.friends.push(action.payload);
    },
    [addFriend.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});


export default userSlice.reducer