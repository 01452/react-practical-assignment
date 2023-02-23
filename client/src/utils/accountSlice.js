import {createSlice} from '@reduxjs/toolkit';

const ACCOUNT_SLICE_NAME = 'account';

const initialState = {
    user: '',
    isLogged: false,
};

const accountSlice = createSlice({
    name: ACCOUNT_SLICE_NAME,
    initialState,
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload;
            state.isLogged = true;
        },
        setLoggedOut: (state) => {
            state.isLogged = false;
            state.user = '';
        },
    },
});

export const {setUser, setLoggedOut} = accountSlice.actions;
export default accountSlice.reducer;
