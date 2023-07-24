import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { red } from '@mui/material/colors';
import { MenuItem } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from 'redux/operations';

import { AddMovieForm, Message } from './AddMovie.styled';
import { addMovie, orderMovies } from 'redux/operations';
import { useState } from 'react';
import { getMovies, getIsLoading } from 'redux/selectors';

import { SearchMoviesTitleForm } from 'components/SearchForm/SerachForm';


import { useForm, useFieldArray } from 'react-hook-form';

const moviesFormat = [
  { value: 'VHS'},
  { value: 'DVD'},
  
] 

export const MovieForm = () => {
    const dispatch = useDispatch();
    const movies = useSelector(getMovies);
    const isLoading = useSelector(getIsLoading);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
      defaultValues: {
        actors: [],
      }
    });

      const onSubmit = (data) => {
       console.log(data)
        dispatch(addMovie(data))
        reset();
      }


    return (
      <>
      <AddMovieForm onSubmit={handleSubmit(onSubmit)}>
            <TextField
        id="outlined-basic"
        type="text"
        label="Назва фільму"
        variant="outlined"
        name="title"
        size="small"
        sx={{ mb: 2 }}
        {...register('title', {
          required: true,
        })}
      />
      <TextField
        id="outlined-basic"
        type="number"
        label="Рік випуску"
        variant="outlined"
        name="year"
        size="small"
        sx={{ mb: 2 }}
        {...register('year', {
          required: true,
        })}
      /> 
       <TextField
          id="outlined-select-currency"
          select
          name = 'format'
          label="Виберіть формат"
          defaultValue="DVD"
          size="small"
          sx={{width: 225, mb: 2}}
          {...register('format', {
          required: true,
        })}
        >
          {moviesFormat.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
            <TextField
           id="outlined-basic"
           type="text"
           label="Ім'я та прізвище актора"
           variant="outlined"
           name="actors"
           size="small"
           sx={{ mb: 2 }}
           {...register('actors.0', {
             required: true,
           })}
            />
               <TextField
           id="outlined-basic"
           type="text"
           label="Ім'я та прізвище актора"
           variant="outlined"
           name="actors"
           size="small"
           sx={{ mb: 2 }}
           {...register('actors.1', {
             required: true,
           })}
            />
          
      <Button
        variant="contained"
        type="submit"
        size="small"
        sx={{ mb: 2 }}
        color="success"
      >
        Додати фільм
      </Button>
        </AddMovieForm>
        
      {movies.length === 0 ? <div>У Вас немає жодного фільму.</div> : <div>Кількість фільмів у Вашій бібліотеці -  {movies.length}</div>}
      <IconButton
            aria-label="order"
            type="button"
            onClick={() => dispatch(orderMovies())}
          >
            <SortByAlphaIcon/>
      </IconButton>
      <IconButton
            aria-label="order"
            type="button"
            onClick={() => dispatch(fetchMovies())}
          >
            <SearchOffIcon/>
      </IconButton>
      
      <SearchMoviesTitleForm label={'Пошук фільмів за назвою'}  sx={{ mb: 2 }}/>
      <SearchMoviesTitleForm label={'Пошук фільмів за актором'}/>
      </>
    
    )
}