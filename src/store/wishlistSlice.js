import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
        toast.info(`${product.name} removed from wishlist.`);
      } else {
        state.items.push(product);
        toast.success(`${product.name} added to wishlist!`);
      }
    },
    removeFromWishlist(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    clearWishlist(state) {
      state.items = [];
    }
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
