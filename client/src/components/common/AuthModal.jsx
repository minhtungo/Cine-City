import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import CustomModal from './CustomModal';
import Logo from './Logo';

const actionState = {
  login: 'login',
  signUp: 'signup',
};

const AuthModal = () => {
  const { authModalOpen } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.login);

  useEffect(() => {
    if (authModalOpen) {
      setAction(actionState.login);
    }
  }, [authModalOpen]);

  const handleClose = () => {
    dispatch(setAuthModalOpen(false));
  };

  const switchAuthState = (state) => setAction(state);

  return (
    <CustomModal isModalOpen={authModalOpen} handleClose={handleClose}>
      <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Logo />
      </Box>
      {action === actionState.login ? (
        <SignIn switchAuthState={() => switchAuthState(actionState.signUp)} />
      ) : (
        <SignUp switchAuthState={() => switchAuthState(actionState.login)} />
      )}
    </CustomModal>
  );
};
export default AuthModal;
