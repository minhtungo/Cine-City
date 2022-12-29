import { IconButton, Toolbar, InputBase, Box, Collapse } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { TransitionGroup } from 'react-transition-group';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const SearchBar = ({ isNonSmallScreens }) => {
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
      <Toolbar
        sx={{
          paddingX: '0 !important',
        }}
      >
        <TransitionGroup>
          {showSearchBar && (
            <Collapse orientation='horizontal' unmountOnExit>
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
                <InputBase
                  placeholder='Titles, people'
                  onChange={onQueryChange}
                  autoFocus
                  onBlur={onSearchBlur}
                />
              </Box>
            </Collapse>
          )}
        </TransitionGroup>
        {!showSearchBar && (
          <IconButton onClick={onSearchIconClick}>
            <SearchOutlinedIcon />
          </IconButton>
        )}
      </Toolbar>
    </>
  );
};
export default SearchBar;
