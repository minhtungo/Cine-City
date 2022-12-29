import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import tmdbConfigs, { mediaCategories } from '../api/configs/tmdbConfigs';
import { setAppState } from '../redux/features/appStateSlice';

import { toast } from 'react-toastify';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import mediaApi from './../api/modules/mediaApi';
import Hero from './../components/home/Hero';
import uiConfigs from './../configs/uiConfigs';
import usePrevious from './../hooks/usePrevious';
import MediaGrid from './../components/medias/MediaGrid';

const MediaList = () => {
  const { mediaType } = useParams();

  const [medias, setMedias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const prevMediaType = usePrevious(mediaType);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setIsLoading(true);

      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage,
      });

      setIsLoading(false);
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) {
        if (currPage !== 1) {
          setMedias((currentMedias) => [...currentMedias, ...response.results]);
        } else {
          setMedias([...response.results]);
        }
      }
    };

    if (mediaType !== prevMediaType) {
      setCurrCategory(0);
      setCurrPage(1);
    }

    getMedias();
  }, [mediaType, currCategory, currPage, mediaCategories, dispatch]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;
    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <Hero
        mediaType={mediaType}
        mediaCategory={mediaCategories[currCategory]}
      />
      <Box
        sx={{
          ...uiConfigs.style.mainContent,
        }}
      >
        <Stack
          spacing={2}
          direction={{ xs: 'column', md: 'row' }}
          alignItems='center'
          justifyContent='space-between'
          sx={{ marginBottom: 3 }}
        >
          <Typography fontWeight='700' variant='h5'>
            {mediaType === tmdbConfigs.mediaType.movie ? 'Movies' : 'TV Series'}
          </Typography>
          <Stack direction='row' spacing={2}>
            {mediaCategories.map((category, index) => (
              <Button
                key={`index-${index}-${category}`}
                size='large'
                variant={currCategory === index ? 'contained' : 'text'}
                sx={{
                  color:
                    currCategory === index
                      ? 'primary.contrastText'
                      : 'text.primary',
                }}
                onClick={() => onCategoryChange(index)}
              >
                {category === 'top_rated' ? 'Top Rated' : category}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType} />
        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color='primary'
          loading={isLoading}
          onClick={onLoadMore}
        >
          Load More
        </LoadingButton>
      </Box>
    </>
  );
};
export default MediaList;
