import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, getAllOrder, getOrderByUserId } from './orderApi';

const initialState = {
  status: 'idle',
  orders: [],
  error: null,
  successMessage: null,
  orderFetchStatus: 'idle',
  currentOrder: null,
};

export const createOrderAsync = createAsyncThunk('orders/createOrderAsync',async (userId,order) => {
    const createdOrder = await createOrder(userId, order);
    return createdOrder;
  }
);

export const getAllOrderAsync = createAsyncThunk(
  'orders/getAllOrdersAsync',
  async () => {
    const orders = await getAllOrder();
    return orders;
  }
);

export const getOrderByUserIdAsync = createAsyncThunk(
  'orders/getOrderById',
  async (id) => {
    const order = await getOrderByUserId(id);
    return order;
  }
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    resetOrderFetchStatus: (state) => {
      state.orderFetchStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      })
      .addCase(getAllOrderAsync.pending, (state) => {
        state.orderFetchStatus = 'pending';
      })
      .addCase(getAllOrderAsync.fulfilled, (state, action) => {
        state.orderFetchStatus = 'fulfilled';
        state.orders = action.payload;
      })
      .addCase(getAllOrderAsync.rejected, (state, action) => {
        state.orderFetchStatus = 'rejected';
        state.error = action.error;
      })
      .addCase(getOrderByUserIdAsync.pending, (state) => {
        state.orderFetchStatus = 'pending';
      })
      .addCase(getOrderByUserIdAsync.fulfilled, (state, action) => {
        state.orderFetchStatus = 'fulfilled';
        state.orders = action.payload;
      })
      .addCase(getOrderByUserIdAsync.rejected, (state, action) => {
        state.orderFetchStatus = 'rejected';
        state.error = action.error;
      });
  },
});

export const { resetCurrentOrder, resetOrderFetchStatus } = orderSlice.actions;

export const selectOrderStatus = (state) => state.orderSlice.status;
export const selectOrders = (state) => state.orderSlice.orders;
export const selectOrdersErrors = (state) => state.orderSlice.error;
export const selectOrdersSuccessMessage = (state) => state.orderSlice.successMessage;
export const selectCurrentOrder = (state) => state.orderSlice.currentOrder;
export const selectOrderFetchStatus = (state) => state.orderSlice.orderFetchStatus;

export default orderSlice.reducer;
