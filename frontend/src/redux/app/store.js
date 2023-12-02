import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import orderIdSlice from '../features/orderIdSlice';
import chatIdSlice from '../features/chatIdSlice';
import filterSlice from '../features/filterSlice';
import socketSlice from '../features/socketSlice';



const persistConfig = {key: 'root', storage}
const persistedauthReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
    reducer: {
        auth: persistedauthReducer,
        orderId: orderIdSlice,
        chatId: chatIdSlice,
        filter: filterSlice,
        socket: socketSlice,
    },
    middleware: [thunk]
})

export const persistor = persistStore(store);
export default store