import { InputBase, Avatar, Stack } from '@mui/material';
import { useState } from 'react';
import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import userApi from '../api/modules/userApi';
import { setUser } from '../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from './common/CustomModal';
import { LoadingButton } from '@mui/lab';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ChangeAvatar = ({ isChangeAvatar, setIsChangeAvatar }) => {
  const { user } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  let image;

  if (avatar && avatar?.length !== 0) {
    image = URL.createObjectURL(avatar);
  }

  const formik = useFormik({
    initialValues: {
      avatar: '',
    },
    validationSchema: Yup.object({
      avatar: Yup.mixed()
        .required('Please upload an image')
        .test(
          'fileType',
          'Only the following formats are accepted: .jpeg, .jpg, and .png',
          (value) => {
            if (value) {
              const fileType = value.type;
              return (
                fileType === 'image/jpeg' ||
                fileType === 'image/png' ||
                fileType === 'image/jpg'
              );
            }
            return true;
          }
        )
        .test('fileSize', 'File size must be less than 2MB', (value) => {
          // Check if the file size is less than or equal to 2 MB
          if (value) {
            const fileSize = value.size;
            return fileSize <= 2 * 1024 * 1024;
          }
          return true;
        }),
      onSubmit: (values) => onChangeAvatar(values),
    }),
  });

  const onChangeAvatar = async (e) => {
    e.preventDefault();
    try {
      if (avatar) {
        setIsLoading(true);
        const avatarRef = ref(storage, `avatars/${avatar.name}`);
        await uploadBytes(avatarRef, avatar);
        const avatarUrl = await getDownloadURL(avatarRef);

        const { response, error } = await userApi.changeAvatar(avatarUrl);

        if (error) {
          console.error(error);
          toast.error('Error uploading avatar. Please try again later.');
        } else if (response) {
          dispatch(setUser(response));
          // formik.resetForm();
          setIsLoading(false);
          toast.success('Avatar changed successfully.');
        }

        setAvatar(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  const handleClose = () => {
    setIsChangeAvatar(false);
  };

  return (
    <CustomModal isModalOpen={isChangeAvatar} handleClose={handleClose}>
      <form onSubmit={onChangeAvatar}>
        <Stack spacing={0}>
          <Stack
            sx={{
              textAlign: 'center',
            }}
          >
            <InputBase
              accept='image/*'
              style={{ display: 'none' }}
              id='contained-button-file'
              type='file'
              onChange={(e) => {
                setAvatar(e.target.files[0]);
              }}
              sx={{
                textAlign: 'center',
                width: 'max-content',
              }}
            />
            <label
              htmlFor='contained-button-file'
              sx={{
                textAlign: 'center',
                alignSelf: 'center',
                width: 'max-content',
              }}
            >
              <Stack direction='column' spacing={3}>
                <Avatar
                  alt={`${user.displayName}-avatar`}
                  src={image ? image : user.avatar}
                  sx={{
                    alignSelf: 'center',
                    width: { xs: '100px', sm: '180px' },
                    height: { xs: '100px', sm: '180px' },
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                  }}
                >
                  <div style={{ visibility: 'hidden' }}>
                    <CameraAltOutlinedIcon />
                  </div>
                </Avatar>
                <LoadingButton
                  component='span'
                  size='medium'
                  fullWidth
                  variant='outlined'
                  sx={{
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}
                  loadingPosition='start'
                  startIcon={<CameraAltOutlinedIcon />}
                >
                  Upload Image
                </LoadingButton>
              </Stack>
            </label>
          </Stack>
          <LoadingButton
            type='submit'
            fullWidth
            size='medium'
            variant='contained'
            sx={{ marginTop: 1 }}
            loadingPosition='start'
            startIcon={<SaveOutlinedIcon />}
            loading={isLoading}
          >
            Change Avatar
          </LoadingButton>
        </Stack>
      </form>
    </CustomModal>
  );
};
export default ChangeAvatar;
