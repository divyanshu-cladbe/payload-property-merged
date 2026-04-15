import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./slices/propertySlice";
import locationReducer from "./slices/locationSlice";


export const store = configureStore({
  reducer: {
    properties: propertyReducer,
    location: locationReducer,
  },
});

// These type definitions are correct and can stay as they are
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
