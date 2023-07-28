import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import IconButton from '@mui/material/IconButton';

import { MenuItem } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from 'redux/operations';

import { AddMovieForm, Message } from './AddMovie.styled';
import { addMovie, orderMovies } from 'redux/operations';
import { getMovies } from 'redux/selectors';

import { SearchMoviesTitleForm } from 'components/SearchForm/SerachForm';
import { ImportFromFileForm } from 'components/ImportForm/ImportForm';


import { useForm} from 'react-hook-form';

const moviesFormat = [
  { value: 'VHS'},
  { value: 'DVD'},
  
] 

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
          pattern: /^(?!\s)[a-zA-Z0-9а-яА-ЯіІїЇєЄ,-\s]*$/i,
          
        })}
      />
      {errors.title && <Message>Текст не може містити пробіли на початку та допускає тільки букви, цифри, кому (,) і дефіс (-)</Message>}
      <TextField
        id="outlined-basic"
        type="text"
        label="Рік випуску"
        variant="outlined"
        name="year"
        size="small"
        sx={{ mb: 2 }}
        {...register('year', {
          required: true,
          pattern:
            /^(1850|19[0-9]{2}|200[0-9]|201[0-9]|202[0-2]|2023)$/i,
        })}
      /> 
      {errors.year && <Message>Рік має бути в діапозоні з 1900 до 2023</Message>}
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
             pattern:
            /^(?!\s)[a-zA-Zа-яА-ЯіІїЇєЄ,-\s]*$/i,
           })}
           
            />
            {errors.actors && <Message>Текст не може містити пробіли на початку та допускає тільки букви, кому (,) і дефіс (-)</Message>}
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
             pattern:
            /^(?!\s)[a-zA-Zа-яА-ЯіІїЇєЄ,-\s]*$/i,
           })}
            />
            {errors.actors && <Message>Текст не може містити пробіли на початку та допускає тільки букви, кому (,) і дефіс (-)</Message>}
          
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
      <ImportFromFileForm/>  
      {movies?.length === 0 && <div>У Вас немає жодного фільму.</div>}
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
            onClick={() => dispatch(fetchMovies(0))}
          >
            <SearchOffIcon/>
      </IconButton>
      
      <SearchMoviesTitleForm label={'Пошук фільмів за назвою'}  sx={{ mb: 2 }}/>
      <SearchMoviesTitleForm label={'Пошук фільмів за актором'} />

      </>
    
    )
}