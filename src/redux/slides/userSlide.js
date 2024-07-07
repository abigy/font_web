import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
  id: "",
  city: "",
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (State, action) => {
      const {
        name = "",
        email = "",
        access_token = "",
        address = "",
        phone = "",
        avatar = "",
        _id = "",
        city = "",
        isAdmin = false,
      } = action.payload;

      State.name = name;
      State.email = email;
      State.address = address;
      State.phone = phone;
      State.avatar = avatar;
      State.id = _id;
      State.access_token = access_token;
      State.isAdmin = isAdmin;
      State.city = city;
    },

    resetUser: (State) => {
      State.name = "";
      State.email = "";
      State.address = "";
      State.phone = "";
      State.avatar = "";
      State.id = "";
      State.access_token = "";
      State.isAdmin = false;
      State.city = "";
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
