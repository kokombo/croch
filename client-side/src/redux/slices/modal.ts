import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  openLoginModal: boolean;
  openSignupModal: boolean;
};

const initialState: InitialState = {
  openLoginModal: false,
  openSignupModal: false,
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
  },
});

export const { setOpenLoginModal, setOpenSignupModal } = modalSlice.actions;

export default modalSlice.reducer;
