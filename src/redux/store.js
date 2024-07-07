import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slides/userSlide.js";

export const store = configureStore({
  reducer: { user: userReducer },
});
