import { LoadingButton } from '@mui/lab';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import userApi from '../../api/modules/userApi';
import { setUser } from '../../redux/features/userSlice';

const SignIn = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const signInForm = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'User should be at least 5 characters long')
        .required('Username is required'),
      password: Yup.string()
        .min(5, 'Password should be at least 5 characters long')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage(null);
      setIsLoginRequest(true);
      const { response, error } = await userApi.login(values);
      setIsLoginRequest(false);
      if (response) {
        signInForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success('Login successfully');
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Box component='form' onSubmit={signInForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type='text'
          placeholder='username'
          name='username'
          fullWidth
          value={signInForm.values.username}
          onChange={signInForm.handleChange}
          color='success'
          error={
            signInForm.touched.username &&
            signInForm.errors.username !== undefined
          }
          helperText={signInForm.touched.username && signInForm.errors.username}
        />

        <TextField
          type='password'
          placeholder='password'
          name='password'
          fullWidth
          value={signInForm.values.password}
          onChange={signInForm.handleChange}
          color='success'
          error={
            signInForm.touched.password &&
            signInForm.errors.password !== undefined
          }
          helperText={signInForm.touched.password && signInForm.errors.password}
        />
      </Stack>
      <LoadingButton
        type='submit'
        fullWidth
        size='large'
        variant='contained'
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Login
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={switchAuthState}>
        Sign Up
      </Button>
      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity='error' variant='outlined'>
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};
export default SignIn;
