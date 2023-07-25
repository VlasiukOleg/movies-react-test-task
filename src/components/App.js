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



  useEffect(() => {
    const newUser = {
      email: "petro1@gmail.com",
      name: "Petrov1 Petro",
      password: "super1-password",
      confirmPassword: "super1-password"
    }
    const testUser = {
      email: "petro1@gmail.com",
      password: "super1-password",
      
    }
    dispatch(createUser(newUser));
    dispatch(createSession(testUser));
  }, [dispatch]);

   useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);


  return (
      <Layout>
        <CustomSection title="Бібліотека фільмів">
          <MovieForm/>
          {isLoading && !error && <p>Request in progress...</p>}
          {movies && <MoviesList/>}
          {error && <p>Oops.., something went wrong, please try again!</p>}
        </CustomSection>
      </Layout> 
  );
}


