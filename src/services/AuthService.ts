import axios from 'axios';
import {handleError, handleResponse} from './ApiUtils';
import {printJSON} from '../utils/TestUtil';

// GET requests

export const signIn = ({username, password}) =>
  axios
    .get(`/user?username=${username}&password=${password}`)
    .then(handleResponse)
    .catch(response => {
      if (response.message === 'Request failed with status code 401') {
        return Promise.reject({message: 'User not found'});
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

export const recoverUser = user => {
  return axios
    .post('/user/recovery', {...user})
    .then(handleResponse)
    .catch(response => {
      if (response.message === 'Request failed with status code 401') {
        return Promise.reject({message: 'User not found'});
      }
      return handleError(response);
    });
};
