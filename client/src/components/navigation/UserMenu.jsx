import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../../redux/features/userSlice';
import menuConfigs from '../../configs/menuConfigs';
import UserAvatar from '../common/UserAvatar';
import ChangeAvatar from '../ChangeAvatar';

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      <ChangeAvatar
        isChangeAvatar={isChangeAvatar}
        setIsChangeAvatar={setIsChangeAvatar}
      />
      {user && (
        <>
          <Typography
            variant='h6'
            sx={{
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={toggleMenu}
          >
            <UserAvatar text={user.displayName} />
          </Typography>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            <Stack
              spacing={3.5}
              direction='row'
              alignItems='center'
              sx={{ paddingBottom: '10px' }}
            >
              <UserAvatar text={user.displayName} />
              <Stack direction='column'>
                <Typography variant='body1' fontWeight='500'>
                  {user.displayName}
                </Typography>
                <Typography variant='body2' fontWeight='400'>
                  @{user.username}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={item.label}
                onClick={() => setAnchorEl(null)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform='capitalize'>
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
            <ListItemButton onClick={() => setIsChangeAvatar(true)}>
              <ListItemIcon>
                <AccountBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform='capitalize'>
                    Change Avatar
                  </Typography>
                }
              />
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={() => dispatch(setUser(null))}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform='capitalize'>Log Out</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};
export default UserMenu;
