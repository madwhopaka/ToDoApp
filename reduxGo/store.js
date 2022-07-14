import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import todoListReducer from './reducer.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['taskList']
};

const rootReducer = combineReducers({ todoListReducer: persistReducer(persistConfig, todoListReducer) });

export const Store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(Store);
