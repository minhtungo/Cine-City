import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import tmdbConfigs from '../../api/configs/tmdbConfigs';
import { routeEndpoints } from '../../routes/routes';
import uiConfigs from '../../configs/uiConfigs';
import favoriteUtils from './../../utils/favoriteUtils';
import CircularBar from './CircularBar';

const MediaItem = ({ media, mediaType }) => {
  const { favoriteList } = useSelector((state) => state.user);

  const [title, setTitle] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);
    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date?.split('-')[0]);
    } else {
      setReleaseDate(media.first_air_date?.split('-')[0]);
    }

    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  return (
    <Link
      to={
        mediaType !== 'people'
          ? routeEndpoints.mediaDetail(mediaType, media.id || media.mediaId)
          : routeEndpoints.person(media.id)
      }
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
          paddingTop: '160%',
          '&:hover .media-info': {
            opacity: 1,
            bottom: 0,
          },
          '&:hover .media-back-drop, &:hover .media-play-btn': { opacity: 1 },
          color: 'primary.contrastText',
        }}
      >
        {mediaType !== 'people' && (
          <>
            {favoriteUtils.check({ favoriteList, mediaId: media.id }) && (
              <FavoriteIcon
                color='primary'
                sx={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  fontSize: '1.5rem',
                }}
              />
            )}
            <Box
              className='media-back-drop'
              sx={{
                opacity: { xs: 1, md: 0 },
                transition: 'all .3s ease',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundImage:
                  'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
              }}
            />
            <Button
              className='media-play-btn'
              variant='contained'
              startIcon={<PlayArrowIcon />}
              sx={{
                display: { xs: 'none', md: 'flex' },
                opacity: 0,
                transition: 'all .3s ease',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                '& .MuiButton-startIcon': { marginRight: '-4px' },
              }}
            />
            <Box
              className='media-info'
              sx={{
                transition: 'all .3s ease',
                opacity: { xs: 1, md: 0 },
                position: 'absolute',
                bottom: { xs: 0, md: '-20px' },
                width: '100%',
                height: 'max-content',
                boxSizing: 'border-box',
                padding: { xs: '10px', md: '2rem 1rem' },
              }}
            >
              <Stack spacing={{ xs: 1, md: 2 }}>
                {rate && <CircularBar value={rate} />}
                <Typography>{releaseDate}</Typography>
                <Typography
                  variant='body2'
                  fontWeight='700'
                  sx={{
                    fontSize: '1rem',
                    ...uiConfigs.style.typoLines(1, 'left'),
                  }}
                >
                  {title}
                </Typography>
              </Stack>
            </Box>
          </>
        )}
        {mediaType === 'people' && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: 'max-content',
              bottom: 0,
              padding: '10px',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
          >
            <Typography sx={{ ...uiConfigs.style.typoLines(1, 'left') }}>
              {media.name}
            </Typography>
          </Box>
        )}
      </Box>
    </Link>
  );
};
export default MediaItem;
