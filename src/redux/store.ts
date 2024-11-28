
import bookReducer from "./reducers/Books";
import bookmarkReducer from "./reducers/Bookmarks";
import chapterReducer from "./reducers/Chapters";
import drawerReducer from "./reducers/Drawer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reduxStorage } from "../utils/MMKVutil";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
    books: bookReducer,
    bookmarks: bookmarkReducer,
    chapters: chapterReducer,
    drawer: drawerReducer,
});


const persistConfig = {
    key: 'root',
    storage: reduxStorage,
    // whitelist: ['user','favorite'], // Persist user state
    blacklist: ['drawer'], // Do not persist drawer state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store as any;
export const persistor = persistStore(store);