import axios from 'axios';
import {handleError, handleResponse} from './ApiUtils';

export const chatShare = share => {
  return axios
    .post('/chat/share', {...share})
    .then(handleResponse)
    .catch(handleError);
};

export const chatSend = formData => {
  return axios
    .postForm('/chat/send', formData)
    .then(handleResponse)
    .catch(error => {
      const errorMessage = error.response?.data?.error?.[0];
      if (errorMessage === 'Class "ZMQContext" not found') {
        console.log(errorMessage);
        return;
      }
      throw new Error(error);
    });
};

export const chatAdd = chat => {
  return axios
    .post('/chat/add', {...chat})
    .then(handleResponse)
    .catch(handleError);
};

export const chatDelete = chat => {
  return axios
    .post('/chat/delete', {...chat})
    .then(handleResponse)
    .catch(handleError);
};

export const chatListOpen = () => {
  return axios.get('/chat/listOpen').then(handleResponse).catch(handleError);
};

export const getChat = ({chatId, limit, offset}) => {
  return axios
    .get(`/chat?chat_id=${chatId}&count=${limit}&offset=${offset}`)
    .then(handleResponse)
    .catch(handleError);
};
