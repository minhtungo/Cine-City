import { Avatar } from '@mui/material';

const DefaultAvatar = ({ text }) => {
  const stringToColor = (str) => {
    let hash = 0;
    let i;

    for (i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  return (
    <Avatar
      sx={{
        backgroundColor: stringToColor(text),
        width: 35,
        height: 35,
        marginLeft: '10px'
      }}
      children={`${text.split(' ')[0][0]}`}
    />
  );
};

export default DefaultAvatar;
