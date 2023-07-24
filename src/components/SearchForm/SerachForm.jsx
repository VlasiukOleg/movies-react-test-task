import { useDispatch } from 'react-redux';
import { searchMoviesTitle } from 'redux/operations';

import { SearchForm } from './SearchForm.styled';
import SearchIcon from '@mui/icons-material/Search';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

export const SearchMoviesTitleForm = ({label}) => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
        searchMoviesTitle(
        form.elements.title.value,
        )
    );
    form.reset();
  };

  return (
    <SearchForm  autoComplete="off" onSubmit={handleSubmit}>
      <TextField id="standard-basic" name='title' label={label} variant="standard" size="small"/>
      <IconButton
            aria-label="search"
            type="submit"
          >
            <SearchIcon />
      </IconButton>
    </SearchForm >
  );
};