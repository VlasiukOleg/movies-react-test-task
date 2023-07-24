import { createSlice } from '@reduxjs/toolkit';

import { addMovie, fetchMovies, deleteMovie } from './operations';


const moviesInitialState = {
    items: [],
    isShowItems: false,
    isLoading: false,
    error: null,
    isDelete: false,
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
            state.isShowItems = true;
            state.items=action.payload.data;
        },
        [fetchMovies.rejected]: handleRejected,

        [addMovie.pending]: handlePending,
        [addMovie.fulfilled](state,action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload.data);
        },
        [addMovie.rejected]: handleRejected,


        [deleteMovie.pending](state) {
            state.isLoading = true;
            state.isDelete = false;
        },
        [deleteMovie.fulfilled](state, action) {
            console.log(action);
            state.isLoading = false;
            state.error = null;
            state.isDelete = true;
            state.items = state.items.filter(item => item.id !== action.payload.id);
          },
          [deleteMovie.rejected]: handleRejected,
    }
})

export const moviesReducer = moviesSlice.reducer;