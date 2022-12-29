import { Box, Stack, Typography } from '@mui/material';
import Title from './Title';

const Container = ({ header, children }) => {
  return (
    <Box
      sx={{
        marginTop: '5rem',
        marginX: 'auto',
        color: 'text.primary',
      }}
    >
      <Stack spacing={4}>
        {header && <Title title={header} />}
        {children}
      </Stack>
    </Box>
  );
};
export default Container;
