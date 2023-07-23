import { configureStore} from '@reduxjs/toolkit';

import { moviesReducer } from './moviesSlice';
import { sessionReducer } from './sessionSlice';


export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        // session: sessionReducer,
    }
})