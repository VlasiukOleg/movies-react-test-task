import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { red } from '@mui/material/colors';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from 'redux/operations';

import { AddMovieForm, Message } from './AddMovie.styled';
import { addMovie } from 'redux/operations';
import { useState } from 'react';
import { getMovies } from 'redux/selectors';


import { useForm, useFieldArray } from 'react-hook-form';

export const MovieForm = () => {
    const dispatch = useDispatch();
    const movies = useSelector(getMovies);
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

      const onShowMoviesList = () => {
            dispatch(fetchMovies())
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
          pattern:
            /^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$/i,
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
        id="outlined-basic"
        type="text"
        label="Формат відео"
        variant="outlined"
        name="format"
        size="small"
        sx={{ mb: 2 }}
        {...register('format', {
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
        
        color="success"
      >
        Додати фільм
      </Button>
        </AddMovieForm>
        <Button
        variant="contained"
        type="submit"
        size="small"
        disabled={movies.length === 0}
        color="success"
        sx={{ mt: 2}} 
        onClick = {onShowMoviesList}
      >
        Показати список фільмів
      </Button>
      {movies.length === 0 ? <div>У Вас немає жодного фільму</div> : <div>У вашій бібліотеці кількість фільмів {movies.length}</div>}
      </>
    
    )
}