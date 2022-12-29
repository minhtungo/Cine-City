import { Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const Logo = ({ center }) => {
  const theme = useTheme();

  return (
    <Typography
      component={Link}
      to='/'
      fontWeight='700'
      fontSize={{ xs: '1.42rem', md: '1.7rem' }}
      style={{
        color: theme.palette.text.primary,
        textDecoration: 'none',
        margin: center && 'auto',
      }}
    >
      Cine<span style={{ color: theme.palette.primary.main }}>City</span>
    </Typography>
  );
};
export default Logo;
