import axios from 'axios';
import {handleError, handleResponse} from './ApiUtils';

// GET requests

export const getMy24 = ({queryKey}) => {
  const queryParams = queryKey[1];
  const url = '/my24' + (queryParams?.id ? `?id=${queryParams.id}` : '');
  return axios.get(url).then(handleResponse).catch(handleError);
};

// POST requests

export const postMy24Like = like => {
  return axios
    .post('/my24/update', {...like})
    .then(handleResponse)
    .catch(handleError);
};

export const postMy24 = formData => {
  return axios.post('/my24', formData).then(handleResponse).catch(handleError);
};
