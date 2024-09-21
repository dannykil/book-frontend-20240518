import axios from '../../../node_modules/axios/index';

const client = axios.create({
  // baseURL: 'http://13.124.143.225:8080',
  // baseURL: 'http://192.168.56.31:30003',
  // baseURL: 'http://192.168.56.32:30003',
  // baseURL: 'http://192.168.56.33:8080',
  // baseURL: 'http://localhost:8080',
  baseURL: 'book-backend-svc-1.book-dev.svc.cluster.local:8080',
});

export default client;
