import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isLoginModalOpen: boolean;
  isSignupModalOpen: boolean;
  isDropDownOpen: boolean;
  isErrorModalOpen: boolean;
  errorMessage: string;
};

const initialState: InitialState = {
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  isDropDownOpen: false,
  isErrorModalOpen: false,
  errorMessage: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenLoginModal: (state, action) => {
      state.isLoginModalOpen = action.payload;
    },

    setOpenSignupModal: (state, action) => {
      state.isSignupModalOpen = action.payload;
    },

    setOpenDropDown: (state, action) => {
      state.isDropDownOpen = action.payload;
    },

    setOpenErrorModal: (state, action) => {
      state.isErrorModalOpen = true;
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
