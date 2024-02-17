import axios from 'axios';
import {handleError, handleResponse} from './ApiUtils';

export const chatShare = share => {
  return axios
    .post('/chat/share', {...share})
    .then(handleResponse)
    .catch(handleError);
};
