import axios from 'axios';

const api = axios.create({
  baseURL: 'http://vps18317.publiccloud.com.br/'
});

export default api;
