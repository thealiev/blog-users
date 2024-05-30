import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../redux/slices/theme";
import postReducer from "../redux/slices/post";
import authReducer from "../redux/slices/auth";
import commentReducer from "../redux/slices/comment";
import userReducer from "../redux/slices/user";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    posts: postReducer, 
    auth: authReducer,
    comment: commentReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: true,
}); 

export default store;
