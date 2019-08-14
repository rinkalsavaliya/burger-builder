import axios from 'axios';
import { config } from './config/config';

const instance = axios.create({
  baseURL: config.apiUrl
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
instance.defaults.headers.get['xyz'] = 'xyz';
instance.defaults.headers.post['jkl'] = 'jkl';

export default instance;
export const apiKey = process.env.REACT_APP_API_KEY || '';
