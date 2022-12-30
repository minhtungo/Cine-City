import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import favoriteApi from '../api/modules/favoriteApi';
import { removeFavorite } from '../redux/features/userSlice';
import MediaItem from '../components/medias/MediaItem';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import uiConfigs from '../configs/uiConfigs';
import Container from '../components/common/Container';

const FavoriteItem = ({ media, onRemoveItem }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const onRemove = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const { response, error } = await favoriteApi.removeFavorite({
      favoriteId: media.id,
    });
    setIsLoading(false);

    if (error) toast.error('Network error. Please try again.');
    if (response) {
      toast.success('Removed from favorite list');
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoveItem(media.id);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant='contained'
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loadingPosition='start'
        loading={isLoading}
        onClick={onRemove}
      >
        Remove
      </LoadingButton>
    </>
  );
};

const SKIP = 8;

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await favoriteApi.getFavoriteList();
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) {
        setCount(response.length);
        setMedias([...response]);
        setFilteredMedias([...response].splice(0, SKIP));
      }
    };

    getFavorites();
  }, []);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * SKIP, SKIP),
    ]);
    setPage(page + 1);
  };

  const onRemoveItem = (id) => {
    const newMedias = [...medias].filter((item) => item.id !== id);
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, SKIP));
    setCount(count - 1);
  };

  return (
    <Box
      sx={{
        ...uiConfigs.style.mainContent,
      }}
    >
      <Container header={`My Favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: '-8x!important' }}>
          {filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={`${media.id}-${index}`}>
              <FavoriteItem media={media} onRemoveItem={onRemoveItem} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>Load More</Button>
        )}
      </Container>
    </Box>
  );
};
export default FavoriteList;
