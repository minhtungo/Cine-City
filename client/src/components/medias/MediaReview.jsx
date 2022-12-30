import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import reviewApi from './../../api/modules/reviewApi';
import UserAvatar from '../common/UserAvatar';
import Container from './../common/Container';

const SKIP = 5;

const Review = ({ review, onRemove }) => {
  const { user } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);

  const onRemoveReview = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const { response, error } = await reviewApi.removeReview({
      removeId: review.id,
    });

    if (error) toast.error(error.message);
    if (response) onRemove(review.id);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: '5px',
        position: 'relative',
        '&:hover': {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack direction='row' spacing={2}>
        {/* Avatar */}
        <UserAvatar text={review.user.displayName} />
        <Stack spacing={2} flexGrow={1}>
          <Stack
            spacing={1}
            direction='row'
            sx={{
              alignItems: 'center',
            }}
          >
            <Typography variant='body1' fontWeight='700'>
              {review.user.displayName}
            </Typography>
            <Typography variant='caption'>
              {dayjs(review.createdAt).format('MMM DD, YYYY HH:mm')}
            </Typography>
          </Stack>
          {/* content */}
          <Typography variant='body1' textAlign='justify'>
            {review.content}
          </Typography>
          {user && user.id === review.user.id && (
            <LoadingButton
              variant='outlined'
              size='medium'
              startIcon={<DeleteIcon />}
              loadingPosition='start'
              loading={isLoading}
              onClick={onRemoveReview}
              sx={{
                position: { xs: 'relative', md: 'absolute' },
                right: { xs: 0, md: '10px' },
                marginTop: { xs: 2, md: 0 },
                width: 'max-content',
              }}
            >
              Remove
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews, media, mediaType }) => {
  const { user } = useSelector((state) => state.user);

  const [reviewList, setReviewList] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    setReviewList([...reviews]);
    setFilteredReviews([...reviews].slice(0, SKIP));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const body = {
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    };

    const { response, error } = await reviewApi.addReview(body);

    setIsLoading(false);
    if (error) toast.error(error.message);
    if (response) {
      toast.success('Add review successfully');
      setContent('');
      //   setReviewList([response, ...reviewList]);
      setFilteredReviews([response, ...reviewList].slice(0, SKIP));
      setReviewCount(reviewCount + 1);
    }
  };

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...reviewList].splice(SKIP * page, SKIP),
    ]);
    setPage(page + 1);
  };

  const onRemove = (id) => {
    if (reviewList.findIndex((review) => review.id === id) !== -1) {
      const newReviewList = [...reviewList].filter(
        (review) => review.id !== id
      );
      setReviewList(newReviewList);
      setFilteredReviews([...newReviewList].splice(0, page * SKIP));
    } else {
      setFilteredReviews(
        [...filteredReviews].filter((review) => review.id !== id)
      );
    }

    setReviewCount(reviewCount - 1);
    toast.success('Remove review successfully');
  };

  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        {user && (
          <>
            <Stack direction='row' spacing={2}>
              <UserAvatar text={user.displayName} />
              <Stack spacing={2} flexGrow={1}>
                <TextField
                  value={content}
                  multiline
                  maxRows={10}
                  placeholder='Write a review...'
                  variant='outlined'
                  onChange={(e) => setContent(e.target.value)}
                />
                <LoadingButton
                  variant='contained'
                  size='medium'
                  sx={{
                    width: 'max-content',
                    alignSelf: 'flex-end',
                  }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition='start'
                  loading={isLoading}
                  onClick={onAddReview}
                >
                  Post
                </LoadingButton>
              </Stack>
            </Stack>
            <Divider />
          </>
        )}
        <Stack spacing={4}>
          {filteredReviews.map((item) => (
            <Box key={item.id}>
              <Review review={item} onRemove={onRemove} />
              <Divider
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < reviewList.length && (
            <Button onClick={onLoadMore}>Load More</Button>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default MediaReview;
