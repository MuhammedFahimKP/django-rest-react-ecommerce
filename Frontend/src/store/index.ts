import { configureStore } from "@reduxjs/toolkit" ;
import authSlice from "./authenticationSlice"
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    auth: authSlice,
  })


const persistedReducer = persistReducer(
    {
      key: "root",
      version: 1,
      storage: storage,
    },
    rootReducer
  );
  


export const store = configureStore({

    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);
export type RootState = ReturnType <typeof rootReducer>;
export type AppDispact = typeof store.dispatch;  
