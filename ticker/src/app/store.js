import { configureStore } from '@reduxjs/toolkit';
import tickerReducer from '../features/ticker/TickerReducer';

export const store = configureStore({
  reducer: {
    ticker: tickerReducer,
  },
});
