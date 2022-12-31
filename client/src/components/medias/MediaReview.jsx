import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Divider,
  Stack,
  useMediaQuery,
  Typography,
  InputAdornment,
  IconButton,
  Input,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector } from 'react-redux';
import reviewApi from './../../api/modules/reviewApi';
import UserAvatar from '../common/UserAvatar';
import ReviewAvatar from '../common/ReviewAvatar';
import Container from './../common/Container';

const SKIP = 4;

dayjs.extend(relativeTime);

const Review = ({ review, onRemove }) => {
  const { user } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const isNonSmallScreens = useMediaQuery('(min-width: 500px)');

  const onRemoveReview = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const { response, error } = await reviewApi.removeReview({
      reviewId: review.id,
    });

    if (error) {
      console.error(error);
      toast.error('Network error. Please try again.');
    }
    if (response) onRemove(review.id);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: '5px',
        position: 'relative',
      }}
    >
      <Stack direction='row' spacing={2}>
        {/* Avatar */}
        <ReviewAvatar
          text={
            review.user?.displayName ||
            review.author_details?.username ||
            review.author
          }
          avatarUrl={
            review.author
              ? review.author_details.avatar_path
              : review.user?.avatar
          }
        />
        <Stack spacing={2} flexGrow={1}>
          <Stack
            spacing={1}
            direction='row'
            sx={{
              alignItems: 'center',
            }}
          >
            <Typography variant='body1' fontWeight='700'>
              {review.user?.displayName ||
                review.author_details?.name ||
                review.author}
            </Typography>
            <Typography variant='caption'>
              {/* {dayjs(review.createdAt || review.created_at).format(
                'MMM DD, YYYY HH:mm'
              )} */}
              {dayjs(review.createdAt || review.created_at).fromNow()}
            </Typography>
          </Stack>
          {/* content */}
          <Typography variant='body1' textAlign='left'>
            {review.content}
          </Typography>
          {!review.author &&
            user &&
            user?.id === review.user?.id &&
            (isNonSmallScreens ? (
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
            ) : (
              <IconButton
                aria-label='delete'
                sx={{
                  marginTop: '10px !important',
                  padding: '5px',
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                }}
                onClick={onRemoveReview}
              >
                <DeleteIcon
                  sx={{
                    color: 'primary.main',
                    height: '20px',
                    width: '20px',
                  }}
                />
              </IconButton>
            ))}
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReview = ({ reviews, media, mediaType }) => {
  const { user } = useSelector((state) => state.user);
  const [reviewList, setReviewList] = useState([]);
  const [tmdbReviewList, setTMDBReviewList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [displayCount, setDisplayCount] = useState(SKIP);
  const [totalReviews, setTotalReviews] = useState(0);

  const isNonSmallScreens = useMediaQuery('(min-width: 500px)');

  let hasUserReview;

  if (user) {
    hasUserReview = reviewList.some((review) => review.user?.id === user?.id);
  }

  useEffect(() => {
    const getTMDBReviewList = async () => {
      const { response, error } = await reviewApi.getTMDBReviewList({
        mediaId: media.id,
        mediaType,
      });

      if (error) {
        console.error(error);
      }
      if (response) {
        setTMDBReviewList(response.results);
      }
    };
    getTMDBReviewList();
  }, []);

  useEffect(() => {
    setReviewList(
      [...tmdbReviewList, ...reviews].sort(
        (a, b) =>
          new Date(b.createdAt || b.created_at) -
          new Date(a.createdAt || a.created_at)
      )
    );
    setTotalReviews(reviewList.length);
  }, [reviews, tmdbReviewList]);

  useEffect(() => {
    setTotalReviews(reviewList.length);
  }, [reviewList]);

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
    if (error) {
      console.error(error);
      toast.error('Network error. Please try again.');
    }
    if (response) {
      toast.success('Add review successfully');
      setReviewList([response, ...reviewList]);
      setTotalReviews(totalReviews + 1);
      setContent('');
    }
  };

  const onLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
    setPage(page + 1);
  };
  const onRemove = (id) => {
    if (reviewList.findIndex((review) => review.id === id) !== -1) {
      const newReviewList = [...reviewList].filter(
        (review) => review.id !== id
      );
      setReviewList(newReviewList);
    }

    setTotalReviews(totalReviews - 1);
    toast.success('Remove review successfully');
  };

  return (
    <>
      <Container header={`Reviews (${totalReviews})`}>
        {user && !hasUserReview ? (
          <>
            <Stack direction='row' spacing={2}>
              <UserAvatar text={user.displayName} />
              <Stack spacing={2} flexGrow={1}>
                <Input
                  value={content}
                  multiline
                  maxRows={10}
                  placeholder='Write a review...'
                  variant='standard'
                  onChange={(e) => setContent(e.target.value)}
                  endAdornment={
                    <InputAdornment position='end'>
                      {content && !isNonSmallScreens ? (
                        <IconButton aria-label='send' onClick={onAddReview}>
                          <SendIcon
                            sx={{
                              marginBottom: '3px',
                              width: '20px',
                              height: '20px',
                              color: 'primary.main',
                            }}
                          />
                        </IconButton>
                      ) : null}
                    </InputAdornment>
                  }
                />
                {isNonSmallScreens && (
                  <LoadingButton
                    variant='contained'
                    size='small'
                    sx={{
                      width: 'max-content',
                      alignSelf: 'flex-end',
                    }}
                    startIcon={<SendIcon />}
                    loadingPosition='start'
                    loading={isLoading}
                    onClick={onAddReview}
                  >
                    Post
                  </LoadingButton>
                )}
              </Stack>
            </Stack>
          </>
        ) : (
          <Typography
            variant='body1'
            sx={{
              color: 'text.secondary',
              paddingLeft: { xs: '18px', md: '0' },
            }}
          >
            {!user
              ? 'Sign in to write a review'
              : `You have already written a review for this ${mediaType}`}
          </Typography>
        )}
        <Stack spacing={4}>
          {reviewList.slice(0, displayCount).map((item) => (
            <Box key={item.id}>
              <Review review={item} onRemove={onRemove} />
              <Divider
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </Box>
          ))}
          {displayCount < reviewList.length && (
            <Button onClick={onLoadMore}>Load More</Button>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default MediaReview;
