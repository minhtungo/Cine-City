import { Box } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import NavigationSwiper from './NavigationSwiper';
import tmdbConfigs from './../../api/configs/tmdbConfigs';

const Backdrops = ({ backdrops }) => {
  return (
    <Box>
      <NavigationSwiper>
        {[...backdrops].splice(0, 10).map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                paddingTop: '60%',
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  item.file_path
                )})`,
              }}
            ></Box>
          </SwiperSlide>
        ))}
      </NavigationSwiper>
    </Box>
  );
};
export default Backdrops;
