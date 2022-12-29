import { Box, Typography } from '@mui/material';

const Title = ({ title }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        paddingX: { xs: '20px', md: 0 },
        maxWidth: '1366px',
        marginX: 'auto',
        width: '100%',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: { xs: '20px', md: '0' },
          top: '100%',
          height: '5px',
          width: '100px',
          backgroundColor: 'primary.main',
        },
      }}
    >
      <Typography variant='h5' fontWeight='700' textTransform='capitalize'>
        {title}
      </Typography>
    </Box>
  );
};
export default Title;
