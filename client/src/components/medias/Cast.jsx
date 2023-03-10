import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { routeEndpoints } from '../../routes/routes';
import uiConfigs from '../../configs/uiConfigs';
import tmdbConfigs from '../../api/configs/tmdbConfigs';

const Cast = ({ casts }) => {
  return (
    <Box
      sx={{
        '& .swiper-slide': {
          width: { xs: '50%', md: '25%', lg: '20%' },
          color: 'primary.contrastText',
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView='auto'
        grabCursor
        style={{ width: '100%', height: 'max-content' }}
      >
        {casts.map((cast) => (
          <SwiperSlide key={cast.id}>
            <Link to={routeEndpoints.cast(cast.id)}>
              <Box
                sx={{
                  paddingTop: '120%',
                  color: 'text.primary',
                  ...uiConfigs.style.backgroundImage(
                    cast.profile_path &&
                      tmdbConfigs.posterPath(cast.profile_path)
                  ),
                }}
              >
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
                    {cast.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
export default Cast;
