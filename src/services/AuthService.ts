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

export const changePassword = password => {
  return axios
    .post('/user/password', {...password})
    .then(handleResponse)
    .catch(handleError);
};

export const createUser = user => {
  return axios
    .post('/user', {...user})
    .then(handleResponse)
    .catch(handleError);
};

export const deleteUser = user => {
  return axios
    .post('/user/delete', {...user})
    .then(handleResponse)
    .catch(handleError);
};

export const oneSignalToken = token => {
  return axios
    .post('/user/oneSignalToken', null, {headers: {'X-BEPERK-TOKEN': token}})
    .then(handleResponse)
    .catch(response => {
      console.log(JSON.stringify(response));
      return;
    });
};
