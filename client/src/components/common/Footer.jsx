import { Button, Paper, Stack, Box } from '@mui/material';
import Container from './Container';
import Logo from './Logo';
import menuConfigs from '../../configs/menuConfigs';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: 'unset', padding: '2rem' }}>
        <Stack
          alignItems='center'
          justifyContent='space-between'
          direction={{ xs: 'column', md: 'row' }}
          sx={{ height: 'max-content' }}
        >
          <Logo />
          <Box>
            {menuConfigs.main.map((item, index) => (
              <Button
                key={item.label}
                sx={{ color: 'inherit', marginLeft: '1rem' }}
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};
export default Footer;
