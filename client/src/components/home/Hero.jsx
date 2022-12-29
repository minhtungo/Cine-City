import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';

import genreApi from '../../api/modules/genreApi';
import mediaApi from '../../api/modules/mediaApi';
import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';
import uiConfigs from '../../configs/uiConfigs';
import tmdbConfigs from '../../api/configs/tmdbConfigs';
import CircularBar from '../common/CircularBar';
import { routeEndpoints } from '../../routes/Routes';

const Hero = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const isNonSmallScreens = useMediaQuery('(min-width: 450px)');

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMovies(response.results);
      if (error) toast.error(error.message);
      dispatch(setGlobalLoading(false));
    };
    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await genreApi.getList({ mediaType });
      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (error) {
        toast.error(error.message);
        setGlobalLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box
      sx={{
        position: 'relative',
        color: 'primary.contrastText',
        '&::before': {
          content: '""',
          width: '100%',
          height: '30%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: 'none',
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: '100%', height: 'max-content' }}
        autoplay={{
          delay: 4200,
          disableOnInteraction: false,
        }}
      >
        {[...movies].splice(0, 5).map((movie, index) => (
          <SwiperSlide key={`${index}-${movie.title}`}>
            <Box
              sx={{
                paddingTop: {
                  xs: '130%',
                  sm: '80%',
                  md: '60%',
                  lg: '45%',
                },
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  movie.backdrop_path || movie.poster_path
                )})`,
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[
                  theme.palette.mode
                ],
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                paddingX: { sm: '10px', md: '5rem', lg: '10rem' },
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingX: '30px',
                  color: 'text.primary',
                  width: { sm: 'unset', md: '30%', lg: '40%' },
                }}
              >
                <Stack spacing={3} direction='column'>
                  {/* title */}
                  <Typography
                    variant='h4'
                    fontSize={{ xs: '1.6rem', md: '2rem', lg: '3rem' }}
                    fontWeight='700'
                    sx={{
                      ...uiConfigs.style.typoLines(3, 'left'),
                      color: 'primary.contrastText',
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>

                  <Stack direction='row' spacing={1} alignItems='center'>
                    {/* rating */}
                    <CircularBar value={movie.vote_average} />
                    {/* genres */}
                    <Divider orientation='vertical' />
                    {isNonSmallScreens
                      ? [...movie.genre_ids].map((genreId, index) => (
                          <Chip
                            variant='filled'
                            color='primary'
                            key={`${movie.id}-${genreId}-${index}`}
                            label={
                              genres.find((e) => e.id === genreId) &&
                              genres.find((e) => e.id === genreId).name
                            }
                          />
                        ))
                      : [...movie.genre_ids]
                          .splice(0, 2)
                          .map((genreId, index) => (
                            <Chip
                              variant='filled'
                              color='primary'
                              key={`${movie.id}-${genreId}-${index}`}
                              label={
                                genres.find((e) => e.id === genreId) &&
                                genres.find((e) => e.id === genreId).name
                              }
                            />
                          ))}
                  </Stack>
                  {/* overview */}
                  <Typography
                    variant='body1'
                    sx={{ ...uiConfigs.style.typoLines(3) }}
                  >
                    {movie.overview}
                  </Typography>

                  <Button
                    variant='contained'
                    size='large'
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routeEndpoints.mediaDetail(mediaType, movie.id)}
                    sx={{ width: 'max-content' }}
                  >
                    Watch Now
                  </Button>
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
export default Hero;
