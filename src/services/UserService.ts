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
    .get(`/user/getFeed?filter=${filter}&limit=${limit}&offset=${offset}`)
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

export const getUserFollowings = () => {
  return axios
    .get('/user/listFollowing')
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

export const getUserHistory = ({queryKey}) => {
  const {filter, limit, offset, onlyNew} = queryKey[1];
  return axios
    .get(
      `/user/getHistory?filter=${filter}&limit=${limit}&offset=${offset}&only_new=${onlyNew}`,
    )
    .then(handleResponse)
    .catch(handleError);
};

export const getPhotoVideo = ({queryKey}) => {
  const {id, limit, offset} = queryKey[1];
  return axios
    .get(`/user/getPhotoVideo?id=${id}&limit=${limit}&offset=${offset}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getVideoFeed = ({queryKey}) => {
  const {filter, limit, offset} = queryKey[1];
  return axios
    .get(`/user/getVideoFeed?filter=${filter}&limit=${limit}&offset=${offset}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getFeaturedFeed = (limit: number, offset: number) => {
  return axios
    .get(`/user/getFeaturedFeed?limit=${limit}&offset=${offset}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getMy24 = ({queryKey}) => {
  const queryParams = queryKey[1];
  const url = '/my24' + (queryParams?.id ? `?id=${queryParams.id}` : '');
  return axios.get(url).then(handleResponse).catch(handleError);
};

// POST requests

export interface UserLikeProps {
  id: number;
  type: number;
  like: number;
}

export const postUserLike = (like: UserLikeProps) => {
  return axios
    .post('/user/update', {...like})
    .then(handleResponse)
    .catch(handleError);
};

export const postMy24Like = (like: UserLikeProps) => {
  return axios
    .post('/my24/update', {...like})
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

export interface DeletePostProps {
  items: string;
}

export const deletePost = (posts: DeletePostProps) => {
  return axios
    .post('/user/deletePost', {...posts})
    .then(handleResponse)
    .catch(handleError);
};

export const addPerk = newPerk => {
  return axios
    .post('/user/add_perk', {...newPerk})
    .then(handleResponse)
    .catch(handleError);
};

export const addFollowing = following => {
  return axios
    .post('/user/addFollowing', {...following})
    .then(handleResponse)
    .catch(handleError);
};

export const deleteFollowing = following => {
  return axios
    .post('/user/deleteFollowing', {...following})
    .then(handleResponse)
    .catch(handleError);
};

export const postBookmarks = bookmark => {
  return axios
    .post('/user/bookmarks', {...bookmark})
    .then(handleResponse)
    .catch(handleError);
};
