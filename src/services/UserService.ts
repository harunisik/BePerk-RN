import axios from 'axios';
import {handleError, handleResponse} from './ApiUtils';

export const signIn = ({username, password}) =>
  axios
    .get(`/user?login=${username}&password=${password}`)
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
  const {id, limit, offset} = queryKey[1];
  return axios
    .get(`/user/getPerks?id=${id}&limit=${limit}&offset=${offset}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getUserFeed = ({queryKey}) => {
  const {filter, limit, offset} = queryKey[1];
  return axios
    .get(`/user/getFeed?filter=${filter}&limit=${limit}&offset=${offset}`, {
      headers: {'ACCEPT-VERSION': 3},
    })
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

export const deletePost = posts => {
  return axios
    .post('/user/deletePost', {...posts}, {headers: {'ACCEPT-VERSION': 3}})
    .then(handleResponse)
    .catch(handleError);
};

export const getUserExploring = ({queryKey}) => {
  const {filter, limit, offset, subtype} = queryKey[1];
  return axios
    .get(
      `/user/exploring?filter=${filter}&limit=${limit}&offset=${offset}&subtype=${subtype}`,
    )
    .then(handleResponse)
    .catch(handleError);
};

export const addPerk = newPerk => {
  return axios
    .post('/user/add_perk', {...newPerk}, {headers: {'ACCEPT-VERSION': 3}})
    .then(handleResponse)
    .catch(handleError);
};

export const getUserHistory = ({queryKey}) => {
  const {filter, limit, offset, onlyNew} = queryKey[1];
  return axios
    .get(
      `/user/getHistory?filter=${filter}&limit=${limit}&offset=${offset}&only_new=${onlyNew}`,
      {headers: {'ACCEPT-VERSION': 3}},
    )
    .then(handleResponse)
    .catch(handleError);
};
