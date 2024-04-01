import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  openLoginModal: boolean;
  openSignupModal: boolean;
  openDropDown: boolean;
  openErrorModal: boolean;
  errorMessage: string;
};

const initialState: InitialState = {
  openLoginModal: false,
  openSignupModal: false,
  openDropDown: false,
  openErrorModal: false,
  errorMessage: "",
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

    setOpenErrorModal: (state, action) => {
      state.openErrorModal = true;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setOpenLoginModal,
  setOpenSignupModal,
  setOpenDropDown,
  setOpenErrorModal,
} = modalSlice.actions;

export default modalSlice.reducer;
