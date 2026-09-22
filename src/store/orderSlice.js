import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder(state, action) {
      const order = action.payload;
      state.orders.unshift({ // Add to top
        ...order,
        status: order.status || 'Processing',
        date: order.date || new Date().toISOString(),
      });
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    updateOrderStatus(state, action) {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.orderId === orderId);
      if (order) {
        order.status = status;
      }
    }
  },
});

export const { placeOrder, setOrders, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
