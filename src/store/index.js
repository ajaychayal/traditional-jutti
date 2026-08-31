import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import authReducer from './authSlice';
import orderReducer from './orderSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    order: orderReducer,
    theme: themeReducer,
  },
});
