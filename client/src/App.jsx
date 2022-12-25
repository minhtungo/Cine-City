import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import ToastContainer from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import themeConfigs from './configs/themeConfigs';

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      //reset and normalize the styles of the document. ensure consistent across different browsers and devices avoid conflicts with the default styles of the browser.
      <CssBaseline />
      <ToastContainer
        position='bottem-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
    </ThemeProvider>
  );
};
export default App;
