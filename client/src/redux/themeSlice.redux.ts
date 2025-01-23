import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  localTheme: "dark" | "light";
} = {
  localTheme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    getTheme(state) {
      const localTheme = localStorage.getItem("pikoria_theme") as
        | "light"
        | "dark";
      if (!localTheme) {
        localStorage.setItem("pikoria_theme", "dark");
        state.localTheme = "dark";
      } else {
        if (localTheme !== "dark" && localTheme !== "light") {
          localStorage.setItem("pikoria_theme", "dark");
          state.localTheme = "dark";
        } else {
          state.localTheme = localTheme;
        }
      }
    },
    changeTheme(state) {
      const localTheme = localStorage.getItem("pikoria_theme") as
        | "light"
        | "dark";
      if (!localTheme) {
        getTheme();
      } else {
        if (localTheme === "dark") {
          localStorage.setItem("pikoria_theme", "light");
          state.localTheme = "light";
        } else {
          localStorage.setItem("pikoria_theme", "dark");
          state.localTheme = "dark";
        }
      }
    },
  },
});

export const { getTheme, changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
