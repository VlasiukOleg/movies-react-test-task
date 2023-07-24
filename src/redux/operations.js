import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/api/v1";

const  accesToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0OTcyMjYwfQ.X31cryg_A126WLYT96PD-SLLFWSxb2SeoQZ4cvx3VhU'

// / Utility to add JWT
const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `${token}`;
  };
  
  // Utility to remove JWT
  const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
  };


  export const createUser = createAsyncThunk(
    'session/login',
    async (credentials, thunkApi) => {
      try {
        const res = await axios.post('/users', credentials);
        setAuthHeader(res.data.token);
        return res.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.value);
      }
    }
  );

  export const createSession = createAsyncThunk(
    'session/create',
    async (credentials, thunkApi) => {
      try {
        const res = await axios.post('/sessions', credentials);
        console.log(res.data.token);
        setAuthHeader(res.data.token);
        return res.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.value);
      }
    }
  );


export const fetchMovies = createAsyncThunk(
    'movies/fetchAllMovie',
    async (_, thunkAPI) => {
        try {
            setAuthHeader(accesToken);
            const response = await axios.get('/movies');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


export const fetchMovieInfo = createAsyncThunk(
  'movies/fetchMOvieInfo',
  async (movieId, thunkAPI) => {
      try {
          setAuthHeader(accesToken);
          const response = await axios.get(`/movies/${movieId}`);
          return response.data;
      } catch (error) {
          return thunkAPI.rejectWithValue(error.message);
      }
  }
)
  
export const addMovie = createAsyncThunk(
    'movies/addMovie',
    async (credentials, thunkAPI) => {
        try {
            setAuthHeader(accesToken);
            const response = await axios.post('/movies', credentials);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteMovie = createAsyncThunk(
    'movies/deleteMovies',
    async (movieId, thunkAPI) => {
      try {
        const response = await axios.delete(`/movies/${movieId}`);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

 

  export const orderMovies = createAsyncThunk(
    'movies/sortMovies',
    async (_, thunkAPI) => {
       const params = {
        sort: 'title',
      };
      try {
        const response = await axios.get(`/movies/`, {params});
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );


  export const searchMoviesTitle = createAsyncThunk(
    'movies/searchMoviesTitle',
    async (querySearch, thunkAPI) => {
       const params = {
        search: `${querySearch}`,
      };
      try {
        const response = await axios.get(`/movies/`, {params});
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  export const importMovies = createAsyncThunk(
    'movies/importMovies',
    async (formData, thunkAPI) => {
      try {
        const response = await axios.post(`/movies/import`, formData);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

 