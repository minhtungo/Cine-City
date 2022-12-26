import { Box } from '@mui/material';
import GlobalLoading from '../common/GlobalLoading';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import AuthModal from './../common/AuthModal';

const MainLayout = () => {
  return (
    <>
      <GlobalLoading />
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
