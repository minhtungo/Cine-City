import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import userApi from '../api/modules/userApi';
import uiConfigs from '../configs/uiConfigs';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Container from '../components/common/Container';
import Title from '../components/common/Title';
import ChangeAvatar from '../components/ChangeAvatar';

const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .min(5, 'Password must be at least 5 characters')
        .required('Password is required'),
      newPassword: Yup.string()
        .test(
          '',
          'New password must be different from current password',
          (value) => value !== formik.values.currentPassword
        )
        .min(5, 'New password must be at least 5 characters')
        .required('New password is required'),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .min(5, 'Confirm password must be at least 5 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => onUpdatePassword(values),
  });

  const onUpdatePassword = async (values) => {
    if (isLoading) return;
    setIsLoading(true);
    const { response, error } = await userApi.changePassword(values);
    setIsLoading(false);

    if (error) toast.error(error.message);

    if (response) {
      formik.resetForm();
      toast.success('Change password successfully');
    }
  };

  return (
    <Box
      sx={{
        ...uiConfigs.style.mainContent,
      }}
    >
      <Container>
        <Box
          component='form'
          maxWidth='400px'
          onSubmit={formik.handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Stack spacing={4}>
            <Title title='Change Password' />
            <Stack spacing={2}>
              <TextField
                type='password'
                placeholder='Password'
                name='currentPassword'
                fullWidth
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                color='success'
                error={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword !== undefined
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
              />
              <TextField
                type='password'
                placeholder='New Password'
                name='newPassword'
                fullWidth
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                color='success'
                error={
                  formik.touched.newPassword &&
                  formik.errors.newPassword !== undefined
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />
              <TextField
                type='password'
                placeholder='Confirm New Password'
                name='confirmNewPassword'
                fullWidth
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                color='success'
                error={
                  formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword !== undefined
                }
                helperText={
                  formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword
                }
              />
              <LoadingButton
                type='submit'
                variant='contained'
                fullWidth
                sx={{ marginTop: 4 }}
                loading={isLoading}
              >
                Change Password
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Container>
     
    </Box>
  );
};
export default UpdatePassword;
