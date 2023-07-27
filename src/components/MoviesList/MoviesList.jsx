import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getIsDelete } from 'redux/selectors';

import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';


import { deleteMovie, fetchMovies } from 'redux/operations';

import { Movies, MoviesItem } from './MoviesList.styled';

import { ModalMovieInfo } from 'components/ModalMovieInfo/ModalMOvieInfo';

export const MoviesList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(getMovies);
    const isDelete = useSelector(getIsDelete);
  


      useEffect(() => {
        // eslint-disable-next-line no-lone-blocks
        {isDelete && dispatch(fetchMovies())}
  }, [dispatch, isDelete]);

    const handleDelete = (movieId) => {
      Confirm.show(
        'Попередження',
        'Ви дійсно хочете видалити цей фільм?',
        'Yes',
        'No',
        () => {
          dispatch(deleteMovie(movieId))
        },
        () => {
        return;
        },
        {
          titleColor:'#c62828' ,
        }
        );
    }

    return (
        <Movies>
             {movies.map(movie => (
            <MoviesItem key={movie.id}>
                {movie.title}
          <ModalMovieInfo movieId = {movie.id}/>
          <IconButton
            aria-label="delete"
            type="button"
            onClick={() => handleDelete(movie.id)}
          >
            <DeleteIcon sx={{ color: red[400] }} />
          </IconButton>
            </MoviesItem>
        ))}
        
        </Movies>
       
    )
}