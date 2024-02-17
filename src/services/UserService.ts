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

export const updateUser = newLike => {
  return axios
    .post('/user/update', {...newLike})
    .then(handleResponse)
    .catch(handleError);
};

export const getUserComments = ({queryKey}) => {
  const {id, type} = queryKey[1];
  return axios
    .get(`/user/comment?id=${id}&type=${type}`)
    .then(handleResponse)
    .catch(handleError);
};

export const postComment = newComment => {
  return axios
    .post('/user/comment', {...newComment})
    .then(handleResponse)
    .catch(handleError);
};

export const deleteComment = comment => {
  return axios
    .post('/user/deleteComment', {...comment})
    .then(handleResponse)
    .catch(handleError);
};

export const getUserFollowings = () => {
  return axios
    .get('/user/listFollowing')
    .then(handleResponse)
    .catch(handleError);
};