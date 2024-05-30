import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "light", // default theme
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", state.theme); // Set data-theme attribute
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
