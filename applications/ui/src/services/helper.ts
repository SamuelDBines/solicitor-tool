import axios from 'axios';
export const apiUrl = 'http://localhost:5000/api';

export const post = (api: string, body, headers) => {
  return axios.post(`${apiUrl}${api}`, body, {
    headers: {
      ...headers,
      Authorization: localStorage.getItem('token')
    }
  });
};

export const put = (api: string, body, headers) => {
  return axios.put(`${apiUrl}${api}`, body, {
    headers: {
      ...headers,
      Authorization: localStorage.getItem('token')
    }
  });
};

export const del = (api: string, headers) => {
  return axios.delete(`${apiUrl}${api}`, {
    headers: {
      ...headers,
      Authorization: localStorage.getItem('token')
    }
  });
};

export const get = (api: string, headers) => {
  return axios.post(`${apiUrl}${api}`, body, {
    headers: {
      ...headers,
      Authorization: localStorage.getItem('token')
    }
  });
};