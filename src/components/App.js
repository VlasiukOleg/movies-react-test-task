import { Layout } from "./Layout/Layout";
import { CustomSection } from "./Section/Section";
import { MovieForm } from "./AddMovie/MovieForm";
import { MoviesList } from "./MoviesList/MoviesList";

import { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createSession, createUser, fetchMovies } from "redux/operations";
import { getMovies, getIsError, getIsLoading } from "redux/selectors";


export const App = () =>  {
  const dispatch = useDispatch();
  const error = useSelector(getIsError);
  const isLoading = useSelector(getIsLoading);
  const movies = useSelector(getMovies);


  // useEffect(() => {
  //   const testUser = {
  //     email: "petro@gmail.com",
  //     password: "super-password",
      
  //   }

  //   dispatch(createSession(testUser));
  // }, [dispatch]);

   useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  console.log(movies);

  return (
      <Layout>
        <CustomSection title="Бібліотека фільмів">
          <MovieForm/>
          {movies.length>0 && <MoviesList/>}
        </CustomSection>
      </Layout> 
  );
}


