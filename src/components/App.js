import { Layout } from "./Layout/Layout";
import { CustomSection } from "./Section/Section";
import { MovieForm } from "./AddMovie/MovieForm";
import { MoviesList } from "./MoviesList/MoviesList";

import { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createSession, createUser, fetchMovies } from "redux/operations";
import { getMovies, getIsError, getIsLoading, getIsShowItems } from "redux/selectors";


export const App = () =>  {
  const dispatch = useDispatch();
  const error = useSelector(getIsError);
  const isLoading = useSelector(getIsLoading);
  const movies = useSelector(getMovies);
  const isShowItems = useSelector(getIsShowItems);


  useEffect(() => {
    // const newUser = {
    //   email: "petro1@gmail.com",
    //   name: "Petrov1 Petro",
    //   password: "super1-password",
    //   confirmPassword: "super1-password"
    // }
    const testUser = {
      email: "petro1@gmail.com",
      password: "super1-password",
      
    }
    // dispatch(createUser(newUser));
    dispatch(createSession(testUser));
  }, [dispatch]);

  //  useEffect(() => {
  //   dispatch(fetchMovies());
  // }, [dispatch]);

  console.log(movies);

  return (
      <Layout>
        <CustomSection title="Бібліотека фільмів">
          <MovieForm/>
          {isShowItems && <MoviesList/>}
        </CustomSection>
      </Layout> 
  );
}


