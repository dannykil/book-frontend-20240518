import axios from '../../../node_modules/axios/index';

const client = axios.create({
  baseURL: 'http://localhost:8080',
  //   baseURL: 'http://13.124.143.225:8080',
});

export default client;
