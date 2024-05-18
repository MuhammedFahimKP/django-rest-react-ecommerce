import { configureStore } from "@reduxjs/toolkit" ;
import {thunk,ThunkAction} from "redux-thunk"

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

// slices
import authSlice from "./authenticationSlice"
import alertSlice from "./alertSlice";
import cartSlice from "./cartSlice";
import adminProductSearchSlice  from "../store/admin/productSearchSlice";
import adminProductVariationSlice from "../store/admin/producVarationSlice"
import currentProductSlice from "./currentProductSlice";

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

    reducer : {
      
      persistedReducer,
      alertSlice,
      cartSlice,
      currentProductSlice,
      adminProductSearchSlice,
      adminProductVariationSlice
      
    }, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
          
        }),
})


export const persistor = persistStore(store);


export const {getState,dispatch} = store


export type RootState = ReturnType <typeof store.getState>;
export type AppDispact = typeof store.dispatch;  
