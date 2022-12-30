import { Box, Toolbar, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import castApi from './../../api/modules/castApi';
import { setGlobalLoading } from './../../redux/features/globalLoadingSlice';
import uiConfigs from './../../configs/uiConfigs';
import tmdbConfigs from './../../api/configs/tmdbConfigs';
import CastGrid from './CastGrid';
import Container from '../common/Container';

const CastDetail = () => {
  const { castId } = useParams();
  const [cast, setCast] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCast = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await castApi.detail({ castId });
      dispatch(setGlobalLoading(false));
      if (error) toast.error('Network error. Please try again.');
      // if (error) toast.error(error.message);
      if (response) setCast(response);
    };

    getCast();
  }, []);

  return (
    <>
      <Toolbar />
      {cast && (
        <>
          <Box
            sx={{
              ...uiConfigs.style.mainContent,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Box
                sx={{
                  width: { xs: '50%', md: '20%' },
                }}
              >
                <Box
                  sx={{
                    paddingTop: '160%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'darkgrey',
                    backgroundImage: `url(${tmdbConfigs.posterPath(
                      cast.profile_path
                    )})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: '100%', md: '80%' },
                  padding: { xs: '1rem 0', md: '1rem 2rem' },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant='h5' fontWeight='700'>
                    {`${cast.name} (${
                      cast.birthday && cast.birthday.split('-')[0]
                    }`}
                    {cast.deathday &&
                      ` - ${cast.deathday && cast.deathday.split('-')[0]}`}
                    {')'}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(20, 'left') }}>
                    {cast.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Container header='medias'>
              <CastGrid castId={castId} />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};
export default CastDetail;
