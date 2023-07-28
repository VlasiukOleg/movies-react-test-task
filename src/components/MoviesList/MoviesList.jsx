import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getIsDelete, getTotal } from 'redux/selectors';

import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';

import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';

import { useState } from 'react';

import { deleteMovie, fetchMovies } from 'redux/operations';

import { Movies, MoviesItem } from './MoviesList.styled';

import { ModalMovieInfo } from 'components/ModalMovieInfo/ModalMOvieInfo';

export const MoviesList = () => {
    const [page, setPage] = useState(1)

    const dispatch = useDispatch();
    const movies = useSelector(getMovies);
    const isDelete = useSelector(getIsDelete);
    const totalMovies = useSelector(getTotal);
  
    const countPage = Math.ceil(totalMovies/20);
    const offset = ((page - 1) * 20);

      useEffect(() => {
        // eslint-disable-next-line no-lone-blocks
        dispatch(fetchMovies(offset));
        console.log(page);
        
        {isDelete && dispatch(fetchMovies(offset))}
  }, [dispatch, isDelete, page, offset]);

  const handleChange = (event, value) => {
    setPage(value);
    
  };



    const handleDelete = (movieId) => {
      Confirm.show(
        'Попередження',
        'Ви дійсно хочете видалити цей фільм?',
        'Yes',
        'No',
        () => {
          dispatch(deleteMovie(movieId, offset))
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
      <>
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
        {totalMovies > 20 && <Box sx={{display: 'flex', justifyContent: 'center'}}><Pagination  count={countPage} color="primary" page={page}  onChange={handleChange}/></Box>  }
       
        
      </Movies>
        
        
       
      </>
          
    )
}