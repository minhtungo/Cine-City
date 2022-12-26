import Hero from './../components/Hero';
import tmdbConfigs from './../configs/tmdbConfigs';

const Home = () => {
  return (
    <>
      <Hero
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
    </>
  );
};
export default Home;
