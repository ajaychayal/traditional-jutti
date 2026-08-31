import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const quantityToAdd = newItem.quantity || 1;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
      );

      state.totalQuantity += quantityToAdd;
      state.totalAmount += newItem.price * quantityToAdd;

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
        existingItem.totalPrice += newItem.price * quantityToAdd;
        toast.info(`Increased quantity of ${newItem.name} in cart.`);
      } else {
        state.items.push({
          ...newItem,
          quantity: quantityToAdd,
          totalPrice: newItem.price * quantityToAdd,
        });
        toast.success(`${newItem.name} added to cart!`);
      }
    },
    removeFromCart(state, action) {
      const { id, size, color } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );
      
      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => !(item.id === id && item.size === size && item.color === color)
          );
          toast.info(`Removed ${existingItem.name} from cart.`);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          toast.info(`Decreased quantity of ${existingItem.name} in cart.`);
        }
      }
    },
    clearItemFromCart(state, action) {
      const { id, size, color } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size && item.color === color
      );
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter(
          (item) => !(item.id === id && item.size === size && item.color === color)
        );
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  },
});

export const { addToCart, removeFromCart, clearItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
