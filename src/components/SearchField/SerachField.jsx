import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';

import { FormLogin } from './LoginForm.styled';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <FormLogin autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="outlined-basic"
        type="email"
        label="Email"
        variant="outlined"
        name="email"
        size="small"
        sx={{ mb: 2 }}
      />
      <TextField
        id="outlined-basic"
        type="password"
        label="Password"
        variant="outlined"
        name="password"
        size="small"
        sx={{ mb: 2 }}
      />

      <Button variant="contained" type="submit" size="medium" margin="normal">
        Log In
      </Button>
    </FormLogin>
  );
};