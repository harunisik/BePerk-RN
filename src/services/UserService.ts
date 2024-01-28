import {handleError, handleResponse} from './ApiUtils';

export const signIn = (login: String, password: String) =>
  fetch(`${process.env.API_URL}/user?login=${login}&password=${password}`)
    .then(handleResponse)
    .catch(response => {
      if (response.status === 401) {
        return Promise.reject('User not found');
      }
      return handleError(response);
    });
