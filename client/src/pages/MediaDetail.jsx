import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import mediaApi from '../../src/api/modules/mediaApi';
import ImageHeader from '../components/medias/ImageHeader';
import tmdbConfigs from './../api/configs/tmdbConfigs';
import uiConfigs from '../configs/uiConfigs';
import CircularBar from './../components/common/CircularBar';
import Cast from '../components/medias/Cast';
import Container from './../components/common/Container';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import favoriteApi from '../api/modules/favoriteApi';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';
import MediaVideos from '../components/medias/MediaVideos';
import Backdrops from '../components/medias/Backdrops';
import Recommendation from './../components/medias/Recommendation';
import MediaSlide from '../components/medias/MediaSlide';
import MediaReview from '../components/medias/MediaReview';

import dayjs from 'dayjs';
import { routeEndpoints } from '../routes/routes';

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();
  const { user, favoriteList } = useSelector((state) => state.user);

  const isNonSmallScreens = useMediaQuery('(min-width: 400px)');

  const [media, setMedia] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  const time = dayjs();

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setGenres(response.genres);
        setIsFavorite(response.isFavorite);
      }

      if (error) {
        console.error(error);
        toast.error('Network error. Please try again.');
      }
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

    if (error) {
      console.error(error);
      toast.error('Network error. Please try again.');
    }
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

    if (error) {
      console.error(error);
      toast.error('Network error. Please try again.');
    }

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
        {/* content */}
        <Box
          sx={{
            marginTop: {
              xs: '-10rem',
              md: '-15rem',
              lg: '-20rem',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
            }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: '70%', sm: '50%', md: '32%', xxl: '40%' },
                margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' },
              }}
            >
              <Box
                sx={{
                  paddingTop: '140%',
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      media.poster_path || media.backdrop_path
                    )
                  ),
                }}
              />
            </Box>
            {/* poster */}

            {/* Info */}
            <Box
              sx={{
                width: { xs: '100%', md: '60%' },
                color: 'text.primary',
              }}
            >
              <Stack spacing={3}>
                {/* title */}
                <Stack spacing={1}>
                  <Typography
                    variant='h4'
                    fontSize={{ xs: '1.4rem', md: '1.8rem', lg: '2.4rem' }}
                    fontWeight='700'
                    sx={{ ...uiConfigs.style.typoLines(3, 'left') }}
                  >
                    {media.title || media.name}
                  </Typography>
                  {/* release and runtime */}
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Stack direction='row' spacing={0.5} alignItems='center'>
                      <EventAvailableOutlinedIcon fontSize='small' />
                      <Typography variant='body1'>
                        {media.release_date?.split('-')[0] ||
                          media.first_air_date?.split('-')[0]}
                      </Typography>
                    </Stack>

                    <Divider orientation='vertical' />

                    <Stack direction='row' spacing={0.5} alignItems='center'>
                      <AccessTimeOutlinedIcon fontSize='small' />
                      <Typography variant='body1'>
                        {time
                          .add(media.runtime || media.episode_run_time[0])
                          .format('h[h]mm[m]')}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>

                {/* rates and genres */}
                <Stack direction='row' spacing={1} alignItems='center'>
                  <CircularBar value={media.vote_average} />
                  <Divider orientation='vertical' />
                  {isNonSmallScreens
                    ? genres.map((genre, index) => (
                        <Chip
                          label={genre.name}
                          variant='filled'
                          color='primary'
                          key={`${genre.id}-${index}`}
                        />
                      ))
                    : [...genres]
                        .splice(0, 2)
                        .map((genre, index) => (
                          <Chip
                            label={genre.name}
                            variant='filled'
                            color='primary'
                            key={`${genre.id}-${index}`}
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
                    size='medium'
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
                    size='medium'
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routeEndpoints.watch(
                      media.id,
                      mediaType,
                      media.videos.results[0].key
                    )}
                    // onClick={() => videoRef.current.scrollIntoView()}
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
        {/* videos */}
        <div ref={videoRef} style={{ paddingTop: '2rem' }}>
          <Container header='Videos'>
            <MediaVideos videos={[...media.videos.results].splice(0, 5)} />
          </Container>
        </div>

        {/* Backdrops */}
        {media.images.backdrops.length > 0 && (
          <Container header='Backdrops'>
            <Backdrops backdrops={media.images.backdrops} />
          </Container>
        )}
        {/* review */}
        <MediaReview
          reviews={media.reviews}
          media={media}
          mediaType={mediaType}
        />

        {/* Recommendations */}
        <Container header='You may also like'>
          {media?.recommendations.length > 0 ? (
            <Recommendation medias={media.recommend} mediaType={mediaType} />
          ) : (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          )}
        </Container>
      </Box>
    </>
  ) : (
    <></>
  );
};
export default MediaDetail;
