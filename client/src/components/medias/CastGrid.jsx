import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import castApi from './../../api/modules/castApi';
import tmdbConfigs from './../../api/configs/tmdbConfigs';
import MediaItem from './MediaItem';

const SKIP = 8;

const CastGrid = ({ castId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await castApi.medias({ castId });

      if (error) toast.error(error.message);

      if (response) {
        const sortedMedias = response.cast.sort(
          (a, b) => getReleaseDate(b) - getReleaseDate(a)
        );

        setMedias([...sortedMedias]);
        setFilteredMedias([...sortedMedias].splice(0, SKIP));
      }
    };

    getMedias();
  }, []);

  const getReleaseDate = (media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);

    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * SKIP, SKIP),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: '-8px!important' }}>
        {filteredMedias.map((media, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length && (
        <Button onClick={onLoadMore}>load more</Button>
      )}
    </>
  );
};
export default CastGrid;
