import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchCreateComment = createAsyncThunk(
    'comment/fetchCreateComment',
    async ({postId, comment, username, avatarUrl}, {rejectWithValue}) => {
        try{
            const {data} = await axios.post(`/comments/${postId}`, {
                postId,
                username,
                avatarUrl,
                comment
            })
            return data
        } catch(err) {
            rejectWithValue(err)
        }

    }
)
export const fetchGetComments = createAsyncThunk(
    'comment/fetchGetComments',
    async (postId) => {
        try {
            if(postId) {
                const {data} = await axios.get(`posts/comments/${postId}`)
                return data
            }
            
        } catch(err) {
            console.log(err)
        }

    }
)

const initialState = {
    comments: [],
    isLoading: false
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    extraReducers: {
        [fetchCreateComment.pending]: (state) => {
        state.isLoading = true;
        },
        [fetchCreateComment.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.comments.push(action.payload);
        },
        [fetchCreateComment.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = 'error';
        },
        [fetchGetComments.pending]: (state) => {
            state.isLoading = true;
            state.comments = [];
            },
        [fetchGetComments.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.comments = action.payload;
            },
        [fetchGetComments.rejected]: (state) => {
                state.isLoading = false;
                state.error = 'error';
            }
    }
})

export default commentSlice.reducer