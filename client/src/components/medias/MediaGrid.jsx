import { Grid } from '@mui/material';
import MediaItem from './MediaItem';

const MediaGrid = ({ medias, mediaType }) => {
  return (
    <Grid container spacing={1} sx={{ marginRight: '-8x!important' }}>
      {medias.map((media) => (
        <Grid item xs={6} sm={4} md={3} key={media.id}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};
export default MediaGrid;
