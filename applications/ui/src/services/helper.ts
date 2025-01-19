import axios from 'axios';
export const apiUrl = 'http://localhost:5000/api';

export const getToken = () => `Bearer: ${localStorage.getItem('token')}`;

export const getTeamId = () => {
  const teamId = localStorage.getItem('team');
  if (teamId) return parseInt(teamId, 10);
  return null;
};

export const post = (api: string, body: object, headers: object) => {
  return axios.post(`${apiUrl}${api}`, body, {
    headers: {
      ...headers,
      Authorization: getToken()
    }
  });
};

export const put = (api: string, body: object, headers: object) => {
  return axios.put(`${apiUrl}${api}`, body, {
    headers: {
      ...headers,
      Authorization: getToken()
    }
  });
};

export const del = (api: string, headers: object) => {
  return axios.delete(`${apiUrl}${api}`, {
    headers: {
      ...headers,
      Authorization: getToken()
    }
  });
};

export const get = (api: string, headers: object) => {
  return axios.get(`${apiUrl}${api}`, {
    headers: {
      ...headers,
      Authorization: getToken()
    }
  });
};