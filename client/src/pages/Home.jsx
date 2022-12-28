import Hero from './../components/Hero';
import tmdbConfigs from '../api/configs/tmdbConfigs';
import uiConfigs from '../configs/uiConfigs';
import Container from './../components/common/Container';
import { Box } from '@mui/material';
import MediaSlide from '../components/medias/MediaSlide';

const Home = () => {
  return (
    <>
      <Hero
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      <Box
        marginTop='-4rem'
        sx={{
          ...uiConfigs.style.mainContent,
        }}
      >
        <Container header={'popular movies'}>
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header={'popular series'}>
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header={'top rated movies'}>
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>
        <Container header={'top rated series'}>
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>
      </Box>
    </>
  );
};
export default Home;
