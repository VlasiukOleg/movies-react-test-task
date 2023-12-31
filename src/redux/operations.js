import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = "http://localhost:8000/api/v1";

const  accesToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0OTcyMjYwfQ.X31cryg_A126WLYT96PD-SLLFWSxb2SeoQZ4cvx3VhU'

// / Utility to add JWT
const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `${token}`;
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
        setAuthHeader(res.data.token);
        return res.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.value);
      }
    }
  );


export const fetchMovies = createAsyncThunk(
    'movies/fetchAllMovie',
    async (offset, thunkAPI) => {
      console.log(offset);
      const params = {
        offset: `${offset}`,
      };
        try {
            setAuthHeader(accesToken);
            const response = await axios.get('/movies', {params});
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
            if (response.data.status === 0) {
              Notify.warning('Такий фільм вже є в вашій бібліотеці');
              return;
            } else {
              Notify.success('Фільм успішно доданий до бібліотеки');
              return response.data;
            }
            
        } catch (error) {
      
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteMovie = createAsyncThunk(
    'movies/deleteMovies',
    
    async (movieId, offset, thunkAPI) => {
      const params = {
        offset: `${offset}`,
      };
      try {
        const response = await axios.delete(`/movies/${movieId}`, {params});
        Notify.success('Ви успішно видалили фільм з бібліотеки');
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
          if (response.data.data.length === 0) {
            Notify.warning('По Вашому запиту нічого не знайдено');
            return response.data;
          } else {
            return response.data;
          }
          }   catch (e) {
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

 