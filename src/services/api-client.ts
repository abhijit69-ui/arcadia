import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '65470a59c4c0438680c55d63d92854fd',
  },
});
