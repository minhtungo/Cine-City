import { Box } from '@mui/material';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper';

const AutoSwiper = ({ children }) => {
  return (
    <Box
      sx={{
        '& .swiper-slide': {
          width: {
            xs: '50%',
            sm: '35%',
            md: '25%',
            lg: '20.5%',
          },
        },
        '& .swiper-button-next, & .swiper-button-prev': {
          color: 'text.primary',
          '&::after': { opacity: '0', fontSize: { xs: '0', md: '1.5rem' } },
        },
        '&:hover .swiper-button-next, &:hover .swiper-button-prev': {
          '&::after': { opacity: '1' },
        },
      }}
    >
      <Swiper
        slidesPerView='auto'
        grabCursor
        style={{ width: '100%', height: 'max-content' }}
        navigation
        modules={[Navigation]}
      >
        {children}
      </Swiper>
    </Box>
  );
};
export default AutoSwiper;
