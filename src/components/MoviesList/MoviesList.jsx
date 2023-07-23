import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from 'redux/selectors';

import { Movies, MoviesItem } from './MoviesList.styled';

export const MoviesList = () => {
    const dispatch = useDispatch();
    const movies = useSelector(getMovies);

    return (
        <Movies>
             {movies.map(movie => (
            <MoviesItem key={movie.id}>
                {movie.title}
            </MoviesItem>
        ))}
        </Movies>
       
    )
}