import axios from 'axios';
import {handleError, handleResponse} from './ApiUtils';

export const chatShare = share => {
  return axios
    .post('/chat/share', {...share})
    .then(handleResponse)
    .catch(handleError);
};

export const chatSend = chat => {
  return axios
    .post('/chat/send', {...chat})
    .then(handleResponse)
    .catch(handleError);
};

export const chatListOpen = () => {
  return axios.get('/chat/listOpen').then(handleResponse).catch(handleError);
};

export const getChat = ({queryKey}) => {
  const {chatId, limit, offset} = queryKey[1];
  return axios
    .get(`/chat?chat_id=${chatId}&limit=${limit}&offset=${offset}`)
    .then(handleResponse)
    .catch(handleError);
};
