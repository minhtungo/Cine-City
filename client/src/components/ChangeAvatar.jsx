import { Box, InputBase, Button } from '@mui/material';
import { useState } from 'react';
import { storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import userApi from '../api/modules/userApi';

const ChangeAvatar = () => {
  const [avatar, setAvatar] = useState();

  const onChangeAvatar = async (e) => {
    e.preventDefault();

    try {
      if (avatar) {
        const avatarRef = ref(storage, `avatars/${avatar.name}`);
        await uploadBytes(avatarRef, avatar);
        const avatarUrl = await getDownloadURL(avatarRef);
        console.log(avatarUrl);

        const { response, error } = await userApi.changeAvatar(avatarUrl);
        console.log(response);

        setAvatar(null);
      }
    } catch (error) {
      toast.error('Error uploading avatar. Please try again later.');
    }
  };

  return (
    <Box>
      <form onSubmit={onChangeAvatar}>
        <InputBase
          type='file'
          onChange={(e) => setAvatar(e.target.files[0])}
          accept='image/*'
        />
        <button type='submit'>Submit</button>
      </form>
    </Box>
  );
};
export default ChangeAvatar;
