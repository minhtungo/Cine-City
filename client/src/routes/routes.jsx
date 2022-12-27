import Home from '../pages/Home';
import CastInfo from '../pages/CastInfo';
import MediaSearch from '../pages/MediaSearch';
import MediaList from '../pages/MediaList';
import ProtectedPage from '../components/common/ProtectedPage';
import UpdatePassword from './../pages/UpdatePassword';
import FavoriteList from './../pages/FavoriteList';
import ReviewList from './../pages/ReviewList';
import MediaDetail from './../pages/MediaDetail';

export const routeEndpoints = {
  home: '/',
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: '/search',
  cast: (id) => `/cast/${id}`,
  favoriteList: '/favorites',
  reviewList: '/reviews',
  updatePassword: '/update-password',
};

const routes = [
  {
    index: true,
    element: <Home />,
    state: 'home',
  },
  {
    path: '/cast/:castId',
    element: <CastInfo />,
    state: 'castInfo',
  },
  {
    path: '/search',
    element: <MediaSearch />,
    state: 'search',
  },
  {
    path: '/update-password',
    element: (
      <ProtectedPage>
        <UpdatePassword />
      </ProtectedPage>
    ),
    state: 'updatePassword',
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
];

export default routes;
