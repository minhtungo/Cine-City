import {
  Button,
  Paper,
  Stack,
  Box,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

import Container from './Container';
import Logo from './Logo';
import menuConfigs from '../../configs/menuConfigs';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Footer = () => {
  const [value, setValue] = useState(0);

  return (
    <footer>
      <Container>
        <Paper square={true} sx={{ backgroundImage: 'unset', padding: 5 }}>
          <Stack
            alignItems='center'
            justifyContent='space-between'
            direction={{ xs: 'column', md: 'row' }}
            sx={{ height: 'max-content' }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} alignItems='center'>
              <Logo center={true} />
              <Box
                sx={{
                  display: 'flex',
                  flex: 'wrap',
                  justifyContent: 'center',
                  width: '100%',
                  marginLeft: 'auto',
                  marginTop: { xs: 2, md: 0 },
                }}
              >
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  alignItems='center'
                >
                  {menuConfigs.main.map(({ label, path }, index) => (
                    <Button
                      key={label}
                      sx={{
                        color: 'inherit',
                        marginLeft: { xs: 0, md: 2 },
                        marginBottom: 0,
                      }}
                      component={Link}
                      to={path}
                    >
                      {label}
                    </Button>
                  ))}
                </Stack>
              </Box>
            </Stack>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                marginTop: { xs: 2, md: 0 },
              }}
            >
              🐱Minh Tu Ngo🐶
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </footer>
  );
};
export default Footer;
