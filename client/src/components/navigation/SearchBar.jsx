import {
  IconButton,
  Toolbar,
  InputBase,
  Box,
  useTheme,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { styled, alpha } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchBar = ({ isNonSmallScreens }) => {
  const customTheme = useTheme();

  const [query, setQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { appState } = useSelector((state) => state.appState);

  const navigate = useNavigate();

  const onSearchIconClick = () => {
    if (!isNonSmallScreens) {
      navigate('/search');
    } else {
      setShowSearchBar((currentState) => !currentState);
    }
  };

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim().length > 0) {
      navigate(`/search/?q=${newQuery}`);
    } else if (newQuery.trim().length === 0) {
      navigate(`${appState === 'home' ? '/' : appState}`);
    }
  };

  const onSearchBlur = () => {
    if (query.trim().length === 0) setShowSearchBar(false);
  };

  return (
    <>
      {showSearchBar && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '9px',
            gap: '0.5rem',
            backgroundColor: 'background.input',
            paddingRight: '1.5rem!important',
          }}
        >
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <StyledInputBase
            placeholder='Titles, people'
            onChange={onQueryChange}
            autoFocus
            onBlur={onSearchBlur}
          />
        </Box>
      )}

      {!showSearchBar && (
        <IconButton onClick={onSearchIconClick}>
          <SearchOutlinedIcon />
        </IconButton>
      )}
    </>
  );
};
export default SearchBar;
