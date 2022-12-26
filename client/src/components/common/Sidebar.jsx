import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import uiConfigs from './../../configs/uiConfigs';
import { themeModes } from '../../configs/themeConfigs';
import onSwitchThemeMode from '../../utils/switchThemeUtils';
import Logo from './Logo';
import menuConfigs from './../../configs/menuConfigs';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const Sidebar = ({ isOpened, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { themeMode } = useSelector((state) => state.themeMode);
  const { appState } = useSelector((state) => state.appState);

  const sidebarWidth = uiConfigs.size.sidebarWidth;

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: '20px', color: 'text.primary' }}>
        <Stack width='100%' direction='row' justifyContent='center'>
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: '30px' }}>
        <Typography variant='h6' marginBottom='20px'>
          Menu
        </Typography>
        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: '10px',
              marginY: 1,
              backgroundColor: appState.includes(item.state)
                ? 'primary.main'
                : 'unset',
            }}
            component={Link}
            to={item.path}
            onClick={toggleSidebar}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform='uppercase' variant='body1'>
                  {item.label}
                </Typography>
              }
            />
          </ListItemButton>
        ))}

        {user && (
          <>
            <Typography variant='h6' marginBottom='20px'>
              Account
            </Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: '10px',
                  marginY: 1,
                  backgroundColor: appState.includes(item.state)
                    ? 'primary.main'
                    : 'unset',
                }}
                component={Link}
                to={item.path}
                onClick={toggleSidebar}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform='uppercase' variant='body1'>
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </>
        )}
        <Typography variant='h6' marginBottom='20px'>
          Theme
        </Typography>
        <ListItemButton onClick={onSwitchThemeMode}>
          <ListItemIcon>
            {themeMode === themeModes.dark ? (
              <DarkModeOutlinedIcon />
            ) : (
              <WbSunnyOutlinedIcon />
            )}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform='uppercase'>
                {themeMode === themeModes.dark ? 'Dark Mode' : 'Light Mode'}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </>
  );

  return (
    <Drawer
      open={isOpened}
      onClose={() => toggleSidebar()}
      sx={{
        '& .MuiDrawer-Paper': {
          boxSizing: 'border-box',
          width: sidebarWidth,
          borderRight: '0px',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};
export default Sidebar;
