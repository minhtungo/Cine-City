import {
  AppBar,
  useScrollTrigger,
  Toolbar,
  Button,
  IconButton,
  Stack,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { cloneElement, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { themeModes } from '../../configs/themeConfigs';
import Logo from './Logo';
import menuConfigs from '../../configs/menuConfigs';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import Sidebar from './Sidebar';
import useSwitchTheme from '../../hooks/useSwitchTheme';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? 'text.primary'
        : themeMode === themeModes.dark
        ? 'primary.contrastText'
        : 'text.primary',
      backgroundColor: trigger
        ? 'background.paper'
        : themeMode === themeModes.dark
        ? 'transparent'
        : 'background.paper',
    },
  });
};

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const switchTheme = useSwitchTheme();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <Sidebar isOpened={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            {/* Hamberger Menu */}
            <Stack direction='row' spacing={1} alignItems='center'>
              <IconButton
                color='inherit'
                sx={{ mr: 2, display: { md: 'none' } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                <Logo />
              </Box>
            </Stack>
            {/* main menu on desktop*/}
            <Box
              flexGrow={1}
              alignItems='center'
              display={{ xs: 'none', md: 'flex' }}
            >
              <Box sx={{ marginRight: '30px' }}>
                <Logo />
              </Box>
              {menuConfigs.main.map(
                (menu, index) =>
                  menu.label !== 'search' && (
                    <Button
                      key={`${menu.state}-${index}`}
                      sx={{
                        color: appState.includes(menu.state)
                          ? 'primary.contrastText'
                          : 'inherit',
                        mr: 2,
                      }}
                      component={Link}
                      to={menu.path}
                      variant={
                        appState.includes(menu.state) ? 'contained' : 'text'
                      }
                    >
                      {menu.label}
                    </Button>
                  )
              )}
            </Box>
            {/* user menu */}
            <Stack spacing={user ? 0.5 : 2} direction='row' alignItems='center'>
              <IconButton sx={{ color: 'inherit' }} onClick={switchTheme}>
                {themeMode === themeModes.dark ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <WbSunnyOutlinedIcon />
                )}
              </IconButton>
              {!user && (
                <Button
                  variant='contained'
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  Log In
                </Button>
              )}
              {user && <UserMenu />}
            </Stack>
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Header;
