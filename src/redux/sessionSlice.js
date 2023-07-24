import { createSlice } from '@reduxjs/toolkit';
import { createSession } from './operations';
import { createUser } from './operations';


const initialState = {
    user: { name: null, password: null },
    token: null,
    isLoggedIn: false,
  };



  const sessionSlice = createSlice({
    name: 'session',
    initialState,
    extraReducers: {
        [createUser.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
          },
        [createSession.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
          },

    }
  }
  )

  export const sessionReducer = sessionSlice.reducer;