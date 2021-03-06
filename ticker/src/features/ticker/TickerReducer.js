import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

const initialState = {
  tradingData: [],
  oldTradingData: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const counterSlice = createSlice({
  name: 'ticker',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTrading: (state, data) => {
      state.tradingData = data.payload;
    },
    setOldTrading: (state, data) => {
      state.oldTradingData = data.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
});

export const { setTrading } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.ticker.tradingData;

export default counterSlice.reducer;
