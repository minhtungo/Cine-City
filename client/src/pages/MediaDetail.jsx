import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import mediaApi from '../../src/api/modules/mediaApi';
import ImageHeader from './../components/common/ImageHeader';
import tmdbConfigs from './../api/configs/tmdbConfigs';
import uiConfigs from '../configs/uiConfigs';
import CircularBar from './../components/common/CircularBar';
import Cast from '../components/Cast';
import Container from './../components/common/Container';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import favoriteApi from '../api/modules/favoriteApi';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const { user, favoriteList } = useSelector((state) => state.user);

  const [media, setMedia] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setGlobalLoading(false));

      console.log(response);

      if (response) {
        setMedia(response);
        setGenres(response.genres);
        setIsFavorite(response.isFavorite);
      }

      if (error) toast.error(error.message);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (isLoading) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setIsLoading(true);

    const body = {
      mediaId: mediaId,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, error } = await favoriteApi.addFavorite(body);

    setIsLoading(false);

    if (error) toast.error(error.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success('Added to favorite list');
    }
  };

  const onRemoveFavorite = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const favorite = favoriteList.find(
      (favorite) => favorite.mediaId.toString() === media.id.toString()
    );

    const { response, error } = await favoriteApi.removeFavorite({
      favoriteId: favorite.id,
    });
    setIsLoading(false);

    if (error) toast.error(error.message);

    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success('Removed from favorite list');
    }
  };

  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      <Box
        sx={{
          color: 'primary.contrastText',
          ...uiConfigs.style.mainContent,
        }}
      >
        <Box
          sx={{
            marginTop: {
              xs: '-10rem',
              md: '-15rem',
              lg: '-20rem',
              xl: '-25rem',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
            }}
          >
            <Box
              sx={{
                width: { xs: '70%', sm: '50%', md: '40%' },
                margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' },
              }}
            >
              <Box
                sx={{
                  paddingTop: '140%',
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(media.poster_path) ||
                      media.backdrop_path
                  ),
                }}
              />
            </Box>
            {/* Info */}
            <Box
              sx={{
                width: { xs: '70%', md: '60%' },
                color: 'text.primary',
              }}
            >
              <Stack spacing={5}>
                {/* title */}
                <Typography
                  variant='h4'
                  fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                  fontWeight='700'
                  sx={{ ...uiConfigs.style.typoLines(2, 'left') }}
                >
                  {`${media.title || media.name} ${
                    mediaType === tmdbConfigs.mediaType.movie
                      ? media.release_date.split('-')[0]
                      : media.first_air_date.split('-')[0]
                  }`}
                </Typography>
                {/* rates and genres */}
                <Stack direction='row' spacing={1} alignItems='center'>
                  <CircularBar value={media.vote_average} />
                  <Divider orientation='vertical' />
                  {genres.map((genre, index) => (
                    <Chip
                      label={genre.name}
                      variant='filled'
                      color='primary'
                      key={genre.id}
                    />
                  ))}
                </Stack>
                {/* overview */}
                <Typography
                  variant='body2'
                  sx={{
                    ...uiConfigs.style.typoLines(6, 'left'),
                  }}
                >
                  {media.overview}
                </Typography>
                <Stack direction='row' spacing={1} alignItems='center'>
                  <LoadingButton
                    variant='text'
                    sx={{
                      width: 'max-content',
                      '& .MuiButton-starIcon': {
                        marginRight: '0',
                      },
                    }}
                    size='large'
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition='start'
                    loading={isLoading}
                    onClick={onFavoriteClick}
                  />
                  <Button
                    variant='contained'
                    sx={{
                      width: 'max-content',
                    }}
                    size='large'
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current.scrollIntoView()}
                  >
                    Watch Now
                  </Button>
                </Stack>
                {/* cast */}
                <Container header='Cast'>
                  <Cast casts={media.credits.cast} />
                </Container>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
};
export default MediaDetail;
