import { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Card,
  CardContent,
  Typography,
  ListItemIcon,
} from '@mui/material';
import Container from '../components/common/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mediaApi from '../api/modules/mediaApi';
import GlobalLoading from './../components/common/GlobalLoading';
import Recommendation from '../components/medias/Recommendation';
import MediaSlide from '../components/medias/MediaSlide';
import tmdbConfigs from '../api/configs/tmdbConfigs';
import Title from '../components/common/Title';
import uiConfigs from '../configs/uiConfigs';

const MediaPlayer = () => {
  const { mediaId, mediaType, mediaKey } = useParams();
  const [media, setMedia] = useState(null);
  const navigate = useNavigate();

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });

      if (response) {
        setMedia(response);
      }

      if (error) {
        console.error(error);
        toast.error('Network error. Please try again.');
      }
    };

    getMedia();
  }, [mediaType, mediaId]);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [videoRef]);

  if (!media) {
    return <GlobalLoading />;
  }

  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          '& .react-player': {
            height: {
              sm: '45vh!important',
              md: '65vh!important',
              lg: 'calc(100vh - 4rem) !important',
            },
            width: '85% !important',
            margin: '0 auto',
          },
        }}
      >
        <Stack
          direction='row'
          spacing={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            paddingX: '1rem',
            marginBottom: '1rem',
          }}
        >
          <ListItemIcon onClick={() => navigate(-1)}>
            <ArrowBackIcon
              sx={{
                color: 'primary.main',
                fontSize: '2rem',
              }}
            />
          </ListItemIcon>
          <Typography
            color='#fff'
            variant='h5'
            fontWeight='bold'
            sx={{
              fontSize: { xs: '1.2rem', md: '1.4rem', lg: '1.8rem' },
            }}
          >
            {media.title || media.name}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${mediaKey}`}
            controls
            className='react-player'
          />
        </Box>
      </Box>
      <Box
        sx={{
          ...uiConfigs.style.mainContent,
        }}
      >
        <Container header={'You may also like'}>
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
    </Container>
  );
};
export default MediaPlayer;
