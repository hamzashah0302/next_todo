import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import axios  from 'axios';

import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUri } from '../utils';

export const fetchTodos = createAsyncThunk("userReducer/fetchTodos", async (data) => {
    let {id} = data
    let response = []
    if(id)
        response = await axios.get(baseUri + 'usertodo/'+id);
    return response.data?.posts || [];
});



// create a slice 
export const userslice = createSlice({
    name: "userReducer",
    initialState: {
        isLogin: (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('user_data')).email ? true : false : false ,
        UserTodos : [],
        userData: (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('user_data')) || {} : {},
        sortByDay : '',
        filteredTodos : [],
        isNavOpen : false
    },

    reducers: {
        setLogin: state => {
            state.isLogin = true
        },
        setLogout: state => {
            state.isLogin = false
        },
        setUserData: (state, action) => {
            localStorage.setItem('user_data',JSON.stringify(action.payload));
            state.userData = action.payload
        },
        setFilter:(state , action)=>{
            const flt = state.UserTodos.filter(ele => ele.day == action.payload)
            state.sortByDay = action.payload
            state.filteredTodos = flt
        },
        setNavbar:(state)=>{
            state.isNavOpen = !state.isNavOpen
        }
        
    },

    extraReducers: {
        [fetchTodos.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.loading = false;
            state.UserTodos = [...action.payload];
        },
        [fetchTodos.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        }
    },
})
// config the store 
const store = configureStore({
    reducer: {
        userReducer: userslice.reducer
    }
})

// export default the store 
export default store

// export the action
export const userAction = userslice.actions