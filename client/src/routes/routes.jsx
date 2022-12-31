import Home from '../pages/Home';
import MediaSearch from '../pages/MediaSearch';
import MediaList from '../pages/MediaList';
import ProtectedPage from '../components/common/ProtectedPage';
import UpdatePassword from '../pages/ChangePassword';
import FavoriteList from '../pages/FavoriteList';
import ReviewList from '../pages/ReviewList';
import MediaDetail from '../pages/MediaDetail';
import CastDetail from '../components/medias/CastDetail';
import MediaPlayer from '../pages/MediaPlayer';

export const routeEndpoints = {
  home: '/',
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: '/search',
  cast: (id) => `/cast/${id}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  changePassword: '/change-password',
  watch: (mediaId, mediaType, mediaKey) =>
    `/watch/${mediaType}/${mediaId}/${mediaKey}`,
};

const routes = [
  {
    index: true,
    element: <Home />,
    state: 'home',
  },
  {
    path: '/cast/:castId',
    element: <CastDetail />,
    state: 'castInfo',
  },
  {
    path: '/search',
    element: <MediaSearch />,
    // state: 'search',
  },
  {
    path: '/change-password',
    element: (
      <ProtectedPage>
        <UpdatePassword />
      </ProtectedPage>
    ),
    state: 'changePassword',
  },
  {
    path: '/favorites',
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: 'favorites',
  },
  {
    path: '/reviews',
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: 'reviews',
  },
  {
    path: '/:mediaType',
    element: <MediaList />,
  },
  {
    path: '/:mediaType/:mediaId',
    element: <MediaDetail />,
  },
  {
    path: '/watch/:mediaType/:mediaId/:mediaKey',
    element: <MediaPlayer />,
  },
];

export default routes;
