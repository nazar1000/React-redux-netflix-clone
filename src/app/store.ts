import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import myListSlice from './slices/myListSlice';
import filterSlice from './slices/filterSlice';
import globalSlice from './slices/globalSlice';
// import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    myList: myListSlice,
    filter: filterSlice,
    global: globalSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
