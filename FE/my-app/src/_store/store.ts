import { configureStore } from "@reduxjs/toolkit";
import adminFunctionSlice from "./reducers/adminFunctionSlice";
import AdmissionSlice from "./reducers/admissionSlice";
import { authReducer } from "./auth.slice";

export * from './auth.slice';
export * from './reducers/adminFunctionSlice';
export * from './reducers/admissionSlice';

// Tạo store với configureStore
const store = configureStore({
  reducer: {
    adminFunctionReducer: adminFunctionSlice,
    auth: authReducer,
    admission: AdmissionSlice
  },
});

export default store;

