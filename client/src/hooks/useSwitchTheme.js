import { useDispatch, useSelector } from 'react-redux';
import { setThemeMode } from '../redux/features/themeModeSlice';
import { themeModes } from './../configs/themeConfigs';

const useSwitchTheme = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.themeMode);

  const switchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  return switchTheme;
};

export default useSwitchTheme;
