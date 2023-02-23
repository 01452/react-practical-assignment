import {configureStore} from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
import postSlice from "./postSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice,
        post: postSlice
    }
})