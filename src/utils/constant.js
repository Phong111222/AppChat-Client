import axios from 'axios';
const baseURL = 'http://localhost:5000/api/v1';

const AxiosConfig = axios.create({
  baseURL,
  auth: {
    username: 'tienphong',
    password: '123456',
  },
});

export default AxiosConfig;
