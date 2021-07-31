import axios from 'axios';
const baseURL = 'http://localhost:5000/api/v1';

export const secret = 'tienphong24031999';

export const BasicAuth = {
  username: 'tienphong',
  password: '123456',
};

const AxiosConfig = axios.create({
  baseURL,
});

export default AxiosConfig;

export const gender = ['male', 'female'];
