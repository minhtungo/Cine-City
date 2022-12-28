import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

const main = [
  {
    label: 'home',
    path: '/',
    icon: <HomeOutlinedIcon />,
    state: 'home',
  },
  {
    label: 'movies',
    path: '/movie',
    icon: <SlideshowOutlinedIcon />,
    state: 'movie',
  },
  {
    label: 'tv shows',
    path: '/tv',
    icon: <LiveTvOutlinedIcon />,
    state: 'tv',
  },
  {
    label: 'my list',
    path: '/favorites',
    icon: <FavoriteBorderOutlinedIcon />,
    state: 'favorites',
  },
  {
    label: 'search',
    path: '/search',
    icon: <SearchOutlinedIcon />,
    state: 'search',
  },
];

const user = [
  {
    label: 'favorites',
    path: '/favorites',
    icon: <FavoriteBorderOutlinedIcon />,
    state: 'favorite',
  },
  {
    label: 'reviews',
    path: '/reviews',
    icon: <RateReviewOutlinedIcon />,
    state: 'reviews',
  },
  {
    label: 'update password',
    path: '/update-password',
    icon: <LockResetOutlinedIcon />,
    state: 'passwordUpdate',
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
