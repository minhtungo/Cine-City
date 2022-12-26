import { Box } from '@mui/material';
import GlobalLoading from '../common/GlobalLoading';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import AuthModal from './../common/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import userApi from '../../api/modules/userApi';
import favoriteApi from '../../api/modules/favoriteApi';
import { setFavoriteList, setUser } from '../../redux/features/userSlice';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, error } = await userApi.getUserInfo();

      if (response) dispatch(setUser(response));
      if (error) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, error } = await favoriteApi.getFavoriteList();

      if (response) dispatch(setFavoriteList(response));
      if (error) toast.error(error.message);
    };

    if (user) getFavorites();
    if (!user) dispatch(setFavoriteList([]));
  }, [user, dispatch]);

  return (
    <>
      {/* <GlobalLoading /> */}
      <AuthModal />
      {/* main */}
      <Box display='flex' minHeight='100vh'>
        <Header />
        <Box component='main' flexGrow={1} overflow='hidden' minHeight='100vh'>
          <Outlet />
        </Box>
      </Box>
      {/* footer */}
      <Footer />
    </>
  );
};
export default MainLayout;
