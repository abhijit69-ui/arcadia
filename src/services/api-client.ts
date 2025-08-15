import axios from 'axios';

const apiKey = import.meta.env.VITE_RAWG_API_KEY;
const defaultParams = apiKey ? { key: apiKey } : undefined;

export default axios.create({
  baseURL: '/api',
  params: defaultParams,
});
