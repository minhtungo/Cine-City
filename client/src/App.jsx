import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import themeConfigs from './configs/themeConfigs';
import routes from './routes/routes';
import Wrapper from './components/common/Wrapper';
import MainLayout from './components/layout/MainLayout';

import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      {/* reset and normalize the styles of the document. ensure consistent across
      different browsers and devices avoid conflicts with the default styles of
      the browser. */}
      <CssBaseline />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <Route
                  index
                  key={index * Math.random() * Math.random()}
                  element={
                    route.state ? (
                      <Wrapper state={route.state}>{route.element}</Wrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  path={route.path}
                  key={index * Math.random() * Math.random()}
                  element={
                    route.state ? (
                      <Wrapper state={route.state}>{route.element}</Wrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
