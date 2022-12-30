import { Box, InputBase, Button, Modal, Avatar, Stack } from '@mui/material';
import { useState } from 'react';
import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import userApi from '../api/modules/userApi';
import { setUser } from '../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from './common/CustomModal';
import { LoadingButton } from '@mui/lab';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const ChangeAvatar = ({ isChangeAvatar, setIsChangeAvatar }) => {
  const { user } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  let image;

  if (avatar && avatar?.length !== 0) {
    image = URL.createObjectURL(avatar);
  }

  const onChangeAvatar = async (e) => {
    e.preventDefault();

    try {
      if (isLoading) return;
      if (avatar) {
        setIsLoading(true);
        const avatarRef = ref(storage, `avatars/${avatar.name}`);
        await uploadBytes(avatarRef, avatar);
        const avatarUrl = await getDownloadURL(avatarRef);

        const { response, error } = await userApi.changeAvatar(avatarUrl);

        if (error) {
          toast.error('Error uploading avatar. Please try again later.');
        } else if (response) {
          dispatch(setUser(response));
          setIsLoading(false);
          toast.success('Avatar changed successfully.');
        }

        setAvatar(null);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClose = () => {
    setIsChangeAvatar(false);
  };

  return (
    <CustomModal isModalOpen={isChangeAvatar} handleClose={handleClose}>
      <form onSubmit={onChangeAvatar}>
        <Stack
          sx={{
            marginBottom: '1.5rem',
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
            <Button
              component='span'
              sx={{
                textAlign: 'center',
                alignSelf: 'center',
              }}
            >
              <Avatar
                alt={`${user.displayName}-avatar`}
                src={image ? image : user.avatar}
                sx={{
                  alignSelf: 'center',
                  width: { xs: '100px', sm: '180px' },
                  height: { xs: '100px', sm: '180px' },
                }}
              />
            </Button>
          </label>
        </Stack>
        <LoadingButton
          type='submit'
          fullWidth
          size='medium'
          variant='contained'
          sx={{ marginTop: 4 }}
          loadingPosition='start'
          startIcon={<SendOutlinedIcon />}
          loading={isLoading}
        >
          Change Avatar
        </LoadingButton>
      </form>
    </CustomModal>
  );
};
export default ChangeAvatar;
