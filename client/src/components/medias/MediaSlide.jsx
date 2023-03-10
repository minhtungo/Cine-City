import { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import AutoSwiper from '../common/AutoSwiper';
import { toast } from 'react-toastify';
import mediaApi from '../../api/modules/mediaApi';
import MediaItem from './MediaItem';

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMedias(response.results);
      if (error) {
        console.error(error);
        toast.error('Network error. Please try again.');
      }
    };
    const getTrending = async () => {
      const { response, error } = await mediaApi.getTrending({
        mediaCategory,
        mediaType,
        timeWindow: 'week',
      });

      if (response) setMedias(response.results);
      if (error) {
        console.error(error);
        toast.error('Network error. Please try again.');
      }
    };

    if (mediaCategory === 'trending') {
      getTrending();
      return;
    } else {
      getMedias();
    }
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={`${index}-${media.id}`}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};
export default MediaSlide;
