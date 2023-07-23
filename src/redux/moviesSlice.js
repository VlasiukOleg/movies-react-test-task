import { createSlice } from '@reduxjs/toolkit';

import { addMovie, fetchMovies } from './operations';


const moviesInitialState = {
    items: [],
    isLoading: false,
    error: null,
}

const handlePending = state => {
    state.isLoading = true;
  };
  
  const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  };


const moviesSlice = createSlice({
    name: 'movies',
    initialState: moviesInitialState,
    extraReducers: {
        [fetchMovies.pending]: handlePending,
        [fetchMovies.fulfilled](state,action) {
            state.isLoading = false;
            state.error = null;
            state.items=action.payload.data;
        },
        [fetchMovies.rejected]: handleRejected,

        [addMovie.pending]: handlePending,
        [addMovie.fulfilled](state,action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
        },
        [addMovie.rejected]: handleRejected,

    }
})

export const moviesReducer = moviesSlice.reducer;