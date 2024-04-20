import axios from 'axios';
import {handleError, handleResponse} from './ApiUtils';

// GET requests

export const signIn = ({username, password}) =>
  axios
    .get(`/user?username=${username}&password=${password}`)
    .then(handleResponse)
    .catch(response => {
      if (response.status === 401) {
        return Promise.reject('User not found');
      }
      return handleError(response);
    });

// POST requests

export const postPassword = password => {
  return axios
    .post('/user/password', {...password})
    .then(handleResponse)
    .catch(handleError);
};
