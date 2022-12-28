import { Box } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import NavigationSwiper from '../common/NavigationSwiper';
import tmdbConfigs from '../../api/configs/tmdbConfigs';

const Backdrops = ({ backdrops }) => {
  return (
    <Box>
      <NavigationSwiper>
        {[...backdrops].splice(0, 10).map((item) => (
          <SwiperSlide key={item.file_path}>
            <Box
              sx={{
                paddingTop: '50%',
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
