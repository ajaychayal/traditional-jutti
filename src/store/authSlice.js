import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user || action.payload; // fallback if just user is passed
      if (action.payload.token) {
        state.token = action.payload.token;
      }
      state.isAuthenticated = true;
      toast.success(`Welcome back, ${state.user.name}!`);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      toast.info('You have been logged out.');
    },
    register(state, action) {
      state.user = action.payload.user || action.payload;
      if (action.payload.token) {
        state.token = action.payload.token;
      }
      state.isAuthenticated = true;
      toast.success(`Account created successfully. Welcome, ${state.user.name}!`);
    },
    updateUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }
  },
});

export const { login, logout, register, updateUser } = authSlice.actions;
export default authSlice.reducer;
