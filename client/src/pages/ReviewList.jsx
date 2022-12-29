import { LoadingButton } from '@mui/lab';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import reviewApi from './../api/modules/reviewApi';
import { routeEndpoints } from '../routes/routes';
import uiConfigs from './../configs/uiConfigs';
import tmdbConfigs from './../api/configs/tmdbConfigs';
import Container from '../components/common/Container';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';

const SKIP = 8;

const ReviewItem = ({ review, onRemoveItem }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onRemove = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const { response, error } = await reviewApi.removeReview({
      reviewId: review.id,
    });
    setIsLoading(false);

    if (error) toast.error(error.message);
    if (response) {
      toast.success('Review removed');
      onRemoveItem(review.id);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        padding: 1,
        opacity: isLoading ? 0.5 : 1,
        '&:hover': {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          width: { xs: 0, md: '10%' },
        }}
      >
        <Link
          to={routeEndpoints.mediaDetail(review.mediaType, review.mediaId)}
          style={{ color: 'unset', textDecoration: 'none' }}
        >
          <Box
            sx={{
              paddingTop: '160%',
              ...uiConfigs.style.backgroundImage(
                tmdbConfigs.posterPath(review.mediaPoster)
              ),
            }}
          />
        </Link>
      </Box>
      <Box
        sx={{
          width: { xs: '100%', md: '80%' },
          padding: { xs: 0, md: '0 2rem' },
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routeEndpoints.mediaDetail(review.mediaType, review.mediaId)}
            style={{ color: 'unset', textDecoration: 'none' }}
          >
            <Typography
              variant='h6'
              sx={{
                ...uiConfigs.style.typoLines(1, 'left'),
              }}
            >
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography>
            {dayjs(review.createdAt).format('MMM DD, YYYY HH:mm:ss')}
          </Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>
      <LoadingButton
        variant='contained'
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          right: { xs: 0, md: '10px' },
          marginTop: { xs: 2, md: 0 },
          width: 'max-content',
        }}
        startIcon={<DeleteIcon />}
        loadingPosition='start'
        loading={isLoading}
        onClick={onRemove}
      >
        Remove
      </LoadingButton>
    </Box>
  );
};

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await reviewApi.getReviewList();
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) {
        setCount(response.length);
        setReviews([...response]);
        setFilteredReviews([...response].splice(0, SKIP));
      }
    };

    getReviews();
  }, []);

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...reviews].splice(page * SKIP, SKIP),
    ]);
    setPage(page + 1);
  };

  const onRemoveItem = (id) => {
    const newReviews = [...reviews].filter((item) => item.id !== id);
    setReviews(newReviews);
    setFilteredReviews([...newReviews].splice(0, SKIP));
    setCount(count - 1);
  };
  return (
    <Box
      sx={{
        ...uiConfigs.style.mainContent,
      }}
    >
      <Container header={`My Reviews (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map((review) => (
            <Box key={review.id}>
              <ReviewItem review={review} onRemoveItem={onRemoveItem} />
              <Divider
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < reviews.length && (
            <Button onClick={onLoadMore}>Load More</Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};
export default ReviewList;
