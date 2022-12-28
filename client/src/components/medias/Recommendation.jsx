import { SwiperSlide } from 'swiper/react';
import AutoSwiper from './../common/AutoSwiper';
import MediaItem from './MediaItem';

const Recommendation = ({ medias, mediaType }) => {
  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};
export default Recommendation;
