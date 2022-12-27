import { Box, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
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
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          maxWidth: '550px',
          padding: 4,
          outline: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Logo />
          </Box>
          {action === actionState.login ? (
            <SignIn
              switchAuthState={() => switchAuthState(actionState.signUp)}
            />
          ) : (
            <SignUp
              switchAuthState={() => switchAuthState(actionState.login)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};
export default AuthModal;
