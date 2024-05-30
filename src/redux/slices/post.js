import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchPopularPosts = createAsyncThunk(
  "post/fetchPopularPosts",
  async () => {
    const { data } = await axios.get("/posts/popular");
    return data;
  }
);

export const fetchDeletePost = createAsyncThunk(
  "post/fetchDeletePost",
  async (id) => {
    await axios.delete(`/posts/${id}`);
    return id;
  }
);

export const fetchTags = createAsyncThunk("post/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchSearchPosts = createAsyncThunk(
  "post/fetchSearchPosts",
  async (searchTerm) => {
    const { data } = await axios.get(`/posts/search?term=${searchTerm}`);
    return data;
  }
);

export const toggleLike = createAsyncThunk(
  "post/toggleLike",
  async ({ id, userId }) => {
    const { data } = await axios.post(`/posts/${id}/toggleLike`, { userId });
    return { ...data, postId: id, userId };
  }
);

const initialState = {
  posts: [],
  popularPosts: [],
  tags: [],
  searchResults: [],
  isLoading: false,
  error: null,
  likesCount: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.posts = [];
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.map((post) => ({
          ...post,
          likedBy: post.likedBy || [],
        }));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPopularPosts.pending, (state) => {
        state.isLoading = true;
        state.popularPosts = [];
        state.error = null;
      })
      .addCase(fetchPopularPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularPosts = action.payload;
      })
      .addCase(fetchPopularPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTags.pending, (state) => {
        state.isLoading = true;
        state.tags = [];
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSearchPosts.pending, (state) => {
        state.isLoading = true;
        state.searchResults = [];
        state.error = null;
      })
      .addCase(fetchSearchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDeletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(fetchDeletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, liked, likesCount, userId } = action.payload;
        const post = state.posts.find((post) => post._id === postId);
        if (post) {
          post.likesCount = likesCount;
          post.likedBy = post.likedBy || [];
          if (liked) {
            post.likedBy.push(userId);
          } else {
            post.likedBy = post.likedBy.filter((id) => id !== userId);
          }
        }
      });
  },
});

export const { setLikesCount } = postSlice.actions;
export default postSlice.reducer;
