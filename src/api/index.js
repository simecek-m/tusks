import axios from 'axios';

const config = {
  baseURL: `${process.env.REACT_APP_TODO_BACKEND_HOST}:${process.env.REACT_APP_TODO_BACKEND_PORT}/api`,
};

export function setAuthorizationHeader(token){
  return { headers: { 'Authorization': `Bearer ${token}` }}
} 

export default axios.create(config);
