import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type StateType = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
