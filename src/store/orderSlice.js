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
      state.orders.push({
        ...order,
        status: 'Processing',
        date: new Date().toISOString(),
      });
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

export const { placeOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
