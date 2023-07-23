import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { red } from '@mui/material/colors';

import { useDispatch, useSelector } from 'react-redux';

import { AddMovieForm, Message } from './AddMovie.styled';
import { addMovie } from 'redux/operations';
import { useState } from 'react';


import { useForm } from 'react-hook-form';

export const MovieForm = () => {
  const [isShowInput, setIsShowInput] = useState(false);
    const dispatch = useDispatch();
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

   

    const addInput = () => {
      setIsShowInput(true);
    }

      const onSubmit = (data) => {
        console.log(data);
        dispatch(addMovie(data))
        reset();
      }

    return (
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
        {...register('actors[0]', {
          required: true,
          
        })}
      />
      <IconButton
            aria-label="delete"
            type="button"
            onClick={addInput}
          >
          <GroupAddIcon sx={{ color: red[400] }} />
      </IconButton>
      {isShowInput &&   <TextField
        id="outlined-basic"
        type="text"
        label="Актори"
        variant="outlined"
        name="actors"
        size="small"
        sx={{ mb: 2 }}
        {...register('actors[1]', {
          required: true,
          
        })}
      />}
     
      <Button
        variant="contained"
        type="submit"
        size="small"
        // disabled={isLoading}
        color="success"
      >
        Додати фільм
      </Button>
        </AddMovieForm>
    )
}