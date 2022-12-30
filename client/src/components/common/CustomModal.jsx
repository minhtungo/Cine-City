import { Modal, Box, ListItemIcon } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const CustomModal = ({ children, isModalOpen, handleClose }) => {
  return (
    <Modal open={isModalOpen} onClose={handleClose}>
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
        <Box sx={{ position: 'relative', padding: '0' }}>
          <ListItemIcon
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 10,
              right: 0,
              marginRight: '-20px',
              cursor: 'pointer',
            }}
          >
            <CloseOutlinedIcon />
          </ListItemIcon>
          <Box
            sx={{
              padding: 4,
              boxShadow: 24,
              backgroundColor: 'background.paper',
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default CustomModal;
