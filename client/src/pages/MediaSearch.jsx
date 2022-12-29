import { LoadingButton } from '@mui/lab';
import { Box, Stack, Toolbar, useMediaQuery, TextField } from '@mui/material';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import uiConfigs from '../configs/uiConfigs';
import mediaApi from './../api/modules/mediaApi';
import MediaGrid from './../components/medias/MediaGrid';

const MediaSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState('');

  const isNonSmallScreens = useMediaQuery('(min-width: 450px)');

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || input;

  const searchMedia = useCallback(async () => {
    setIsLoading(true);
    const { response, error } = await mediaApi.mediaMultiSearch({
      query,
      page,
    });

    setIsLoading(false);

    if (error) toast.error(error.message);
    if (response) {
      if (page > 1) {
        setMedias((currentMedias) => [...currentMedias, ...response.results]);
      } else {
        setMedias([...response.results]);
      }
    }
  }, [query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else {
      searchMedia();
    }
  }, [query, page]);

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          {!isNonSmallScreens && (
            <TextField
              color='success'
              placeholder='Titles, people'
              sx={{ width: '100%' }}
              autoFocus
              onChange={(event) => setInput(event.target.value)}
            />
          )}
          <MediaGrid medias={medias} mediaType='movie' />
          {medias.length > 0 && (
            <LoadingButton
              loading={isLoading}
              onClick={() => setPage(page + 1)}
            >
              Load More
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};
export default MediaSearch;
