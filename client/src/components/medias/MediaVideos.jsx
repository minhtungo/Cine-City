import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import tmdbConfigs from '../../api/configs/tmdbConfigs';
import NavigationSwiper from '../common/NavigationSwiper';

const Video = ({ video }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, [video]);

  return (
    <Box sx={{ height: 'max-content' }}>
      <iframe
        key={video.key * Math.random()}
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iframeRef}
        width='100%'
        title={video.id}
        style={{ border: 0 }}
      />
    </Box>
  );
};

const MediaVideos = ({ videos }) => {
  return (
    <NavigationSwiper>
      {videos.map((video, index) => (
        <SwiperSlide key={index}>
          <Video video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};
export default MediaVideos;
