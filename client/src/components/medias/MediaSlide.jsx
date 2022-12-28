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
      if (error) toast.error(error.message);
    };

    getMedias();
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
