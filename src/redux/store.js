import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import accountSlice from './account/accountSlice';
import tablePanaginate  from './tablePanaginate/tablePanaginateSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import  orderItem  from './order/orderSlice';
import bookContentSlice from './book_content/bookContentSlice';



const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // blacklist : ['account']
}

const rootReducer = combineReducers({
      counter: counterReducer,
      account : accountSlice,
      panaginate : tablePanaginate,
      order : orderItem,
      book_content : bookContentSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store)

export {store , persistor}

