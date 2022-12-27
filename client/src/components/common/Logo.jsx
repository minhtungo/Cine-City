import { Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography
      component={Link}
      to='/'
      fontWeight='700'
      fontSize='1.7rem'
      style={{
        color: theme.palette.text.primary,
        textDecoration: 'none',
      }}
    >
      Cine<span style={{ color: theme.palette.primary.main }}>City</span>
    </Typography>
  );
};
export default Logo;
