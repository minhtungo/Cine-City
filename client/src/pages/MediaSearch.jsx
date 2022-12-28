import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, TextField, Toolbar } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import uiConfigs from '../configs/uiConfigs';
import mediaApi from './../api/modules/mediaApi';
import MediaGrid from './../components/medias/MediaGrid';

const mediaTypes = ['movie', 'tv', 'people'];
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const searchMedia = useCallback(async () => {
    setIsLoading(true);

    const { response, error } = await mediaApi.search({
      mediaType,
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
  }, [mediaType, query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else {
      searchMedia();
    }
  }, [query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction='row'
            justifyContent='center'
            sx={{ width: '100%' }}
          >
            {mediaTypes.map((category, index) => (
              <Button
                size='large'
                key={index}
                variant={mediaType === category ? 'contained' : 'text'}
                sx={{
                  color:
                    mediaType === category
                      ? 'primary.contrastText'
                      : 'text.primary',
                }}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </Stack>
          <TextField
            color='success'
            placeholder='Titles, people'
            sx={{
              width: '100%',
            }}
            autoFocus
            onChange={onQueryChange}
          />
          <MediaGrid medias={medias} mediaType={mediaType} />
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
