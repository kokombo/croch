import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  openLoginModal: boolean;
  openSignupModal: boolean;
  openDropDown: boolean;
};

const initialState: InitialState = {
  openLoginModal: false,
  openSignupModal: false,
  openDropDown: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenLoginModal: (state, action) => {
      state.openLoginModal = action.payload;
    },

    setOpenSignupModal: (state, action) => {
      state.openSignupModal = action.payload;
    },

    setOpenDropDown: (state, action) => {
      state.openDropDown = action.payload;
    },
  },
});

export const { setOpenLoginModal, setOpenSignupModal, setOpenDropDown } =
  modalSlice.actions;

export default modalSlice.reducer;
