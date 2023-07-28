import { createSlice } from '@reduxjs/toolkit';

import { addMovie, fetchMovies, deleteMovie, fetchMovieInfo, searchMoviesTitle, importMovies } from './operations';
import { orderMovies } from './operations';

const moviesInitialState = {
    item: [],
    items: [],
    total: 0,
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
// -------------------------------------------------------
        [fetchMovies.pending]: handlePending,
        [fetchMovies.fulfilled](state,action) {
            state.isLoading = false;
            state.error = null;
            state.items=action.payload.data;
            state.total=action.payload.meta.total;
        },
        [fetchMovies.rejected]: handleRejected,
// ----------------------------------------------------

        [fetchMovieInfo.pending]: handlePending,
        [fetchMovieInfo.fulfilled](state,action) {
            state.isLoading = false;
            state.error = null;
            state.item=action.payload.data;
        },
        [fetchMovieInfo.rejected]: handleRejected,

// ---------------------------------------------------------------
        [addMovie.pending]: handlePending,
        [addMovie.fulfilled](state,action) {
            state.isLoading = false;
            state.error = null;
            console.log(action);
            if (action.payload === undefined) {
                return;
            } else  {
                state.items.push(action.payload.data);
                state.total=state.total+1;
            }
            
        },
        [addMovie.rejected]: handleRejected,

// --------------------------------------------------------------
        [orderMovies.pending]: handlePending,
        [orderMovies.fulfilled](state,action) {
            state.isLoading = false;
            state.error = null;
            state.items=action.payload.data;
        },
        [orderMovies.rejected]: handleRejected,

// ----------------------------------------------------------------
        [deleteMovie.pending](state) {
            state.isLoading = true;
            state.isDelete = false;
        },
        [deleteMovie.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.isDelete = true;
            state.items = state.items.filter(item => item.id !== action.payload.id);
            state.total=action.payload.meta?.total;
          },
          [deleteMovie.rejected]: handleRejected,
//--------------------------------------------------------------------
        [searchMoviesTitle.pending]: handlePending,
        [searchMoviesTitle.fulfilled](state,action) {
            state.isLoading = false;
            state.error = null;
            state.items=action.payload.data;
            state.total=action.payload.meta?.total;
        }, 
        [searchMoviesTitle.rejected]: handleRejected,
// -----------------------------------------------------------------
        [importMovies.pending]: handlePending,
        [importMovies.fulfilled](state,action) {
            state.isLoading = false;
            state.error = null;
            state.items=action.payload.data;
            state.total=action.payload.meta?.total;
        }, 
        [importMovies.rejected]: handleRejected,
    }
})

export const moviesReducer = moviesSlice.reducer;