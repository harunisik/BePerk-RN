import axios from 'axios';
import {handleError, handleResponse} from './ApiUtils';

export const signIn = (login: String, password: String) =>
  axios
    .get(`/user?login=${login}&password=${password}`)
    .then(handleResponse)
    .catch(response => {
      if (response.status === 401) {
        return Promise.reject('User not found');
      }
      return handleError(response);
    });

export const getUserProfile = ({queryKey}) => {
  const {id} = queryKey[1];
  return axios
    .get(`/user/profile?id=${id}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getUserPerks = ({queryKey}) => {
  const {id} = queryKey[1];
  return axios
    .get(`/user/getPerks?id=${id}`)
    .then(handleResponse)
    .catch(handleError);
};
