import axios from 'axios';
import {handleError, handleResponse} from './ApiUtils';

// GET requests

export const getUserProfile = ({queryKey}) => {
  const {id} = queryKey[1];
  return axios
    .get(`/user/profile?id=${id}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getUserSettings = () => {
  return axios.get('/user/settings').then(handleResponse).catch(handleError);
};

export const getUserPerks = ({queryKey}) => {
  const {id, limit, offset} = queryKey[1];
  return axios
    .get(`/user/getPerks?id=${id}&limit=${limit}&offset=${offset}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getUserFeed = (filter: number, limit: number, offset: number) => {
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

export const getUserFollowing = ({queryKey}) => {
  const params = queryKey[1];
  return axios
    .get('/user/listFollowing' + (params?.id ? `?id=${params.id}` : ''))
    .then(handleResponse)
    .catch(handleError);
};

export const getUserFollowers = ({queryKey}) => {
  const params = queryKey[1];
  return axios
    .get('/user/listFollowers' + (params?.id ? `?id=${params.id}` : ''))
    .then(handleResponse)
    .catch(handleError);
};

export const getUserExploring = (
  filter: number,
  subtype: number | null,
  limit: number,
  offset: number,
) => {
  const url =
    `/user/exploring?filter=${filter}&limit=${limit}&offset=${offset}` +
    (subtype !== null ? `&subtype=${subtype}` : '');
  return axios.get(url).then(handleResponse).catch(handleError);
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

export const getUserPhotoVideo = (
  id: number,
  limit: number,
  offset: number,
) => {
  return axios
    .get(`/user/getPhotoVideo?id=${id}&limit=${limit}&offset=${offset}`)
    .then(handleResponse)
    .catch(handleError);
};

export const getVideoFeed = (filter: number, limit: number, offset: number) => {
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

export const badgeCount = () => {
  return axios.get('badge/count').then(handleResponse).catch(handleError);
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

export const postProfile = formData => {
  return axios
    .postForm('/user/profile', formData)
    .then(handleResponse)
    .catch(handleError);
};

export const postSettings = settings => {
  return axios
    .post('/user/settings', {...settings})
    .then(handleResponse)
    .catch(handleError);
};

export const uploadPhoto = formData => {
  return axios
    .postForm('/user/upload_photo', formData)
    .then(handleResponse)
    .catch(handleError);
};

export const uploadVideo = formData => {
  return axios
    .postForm('/user/upload_video', formData)
    .then(handleResponse)
    .catch(handleError);
};

export const postNotify = notify => {
  return axios
    .post('/user/postNotify', {...notify})
    .then(handleResponse)
    .catch(handleError);
};

export const sendReport = report => {
  return axios
    .post('/user/sendReport', {...report})
    .then(handleResponse)
    .catch(handleError);
};
