import { configureStore } from '@reduxjs/toolkit';
import { borrowerReducer } from './borrowerSlice';
import { lenderReducer } from './lenderSlice';
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['borrower, lender']
}
const rootReducer = combineReducers({
    borrower: borrowerReducer,
    lender: lenderReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Bỏ qua kiểm tra cho các action này
      },
    }),
});

