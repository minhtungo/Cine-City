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

const SignUp = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isSignUpRequest, setIsSignUpRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const signUpForm = useFormik({
    initialValues: {
      username: '',
      password: '',
      displayName: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'User should be at least 5 characters')
        .required('Username is required'),
      password: Yup.string()
        .min(5, 'Password should be at least 5 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .min(5, 'Confirm password should be at least 5 characters')
        .required('Confirm password is required'),
      displayName: Yup.string()
        .min(5, 'Display name should be at least 5 characters')
        .required('Display name is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage(null);
      setIsSignUpRequest(true);
      const { response, error } = await userApi.signup(values);
      setIsSignUpRequest(false);
      if (response) {
        signUpForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success('Login successfully');
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Box component='form' onSubmit={signUpForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type='text'
          placeholder='Username'
          name='username'
          fullWidth
          value={signUpForm.values.username}
          onChange={signUpForm.handleChange}
          color='success'
          error={
            signUpForm.touched.username &&
            signUpForm.errors.username !== undefined
          }
          helperText={signUpForm.touched.username && signUpForm.errors.username}
        />

        <TextField
          type='text'
          placeholder='Display Name'
          name='displayName'
          fullWidth
          value={signUpForm.values.displayName}
          onChange={signUpForm.handleChange}
          color='success'
          error={
            signUpForm.touched.displayName &&
            signUpForm.errors.displayName !== undefined
          }
          helperText={
            signUpForm.touched.displayName && signUpForm.errors.displayName
          }
        />

        <TextField
          type='password'
          placeholder='Password'
          name='password'
          fullWidth
          value={signUpForm.values.password}
          onChange={signUpForm.handleChange}
          color='success'
          error={
            signUpForm.touched.password &&
            signUpForm.errors.password !== undefined
          }
          helperText={signUpForm.touched.password && signUpForm.errors.password}
        />

        <TextField
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          fullWidth
          value={signUpForm.values.confirmPassword}
          onChange={signUpForm.handleChange}
          color='success'
          error={
            signUpForm.touched.confirmPassword &&
            signUpForm.errors.confirmPassword !== undefined
          }
          helperText={
            signUpForm.touched.confirmPassword &&
            signUpForm.errors.confirmPassword
          }
        />
      </Stack>
      <LoadingButton
        type='submit'
        fullWidth
        size='large'
        variant='contained'
        sx={{ marginTop: 4 }}
        loading={isSignUpRequest}
      >
        Sign Up
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={switchAuthState}>
        Login
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
export default SignUp;
