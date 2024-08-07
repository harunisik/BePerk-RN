import axios from 'axios';
import {handleError, handleResponse} from './ApiUtils';

export const searchUsers = search => {
  return axios
    .post('/search/users', {...search})
    .then(handleResponse)
    .catch(handleError);
};

export const searchHashTagCount = search => {
  return axios
    .post('/search/hashtagCount', {...search})
    .then(handleResponse)
    .catch(handleError);
};
