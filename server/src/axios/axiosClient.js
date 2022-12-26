import axios from 'axios';

const fetchData = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      // type of encoding that does not compress the response data.
      'Accept-Encoding': 'identity',
    },
  });
  return response.data;
};

export default { fetchData };
