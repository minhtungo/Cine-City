import { useDispatch, useSelector } from 'react-redux';
import { themeModes } from '../configs/themeConfigs';
import { setThemeMode } from '../redux/features/themeModeSlice';

const onSwitchThemeMode = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.themeMode);

  const theme =
    themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
  dispatch(setThemeMode(theme));
};

export default onSwitchThemeMode;
