import {showMessage} from 'react-native-flash-message';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  addFollowing,
  addPerk,
  deleteComment,
  deleteFollowing,
  deletePost,
  getPhotoVideo,
  getUserComments,
  getUserExploring,
  getUserFeed,
  getUserFollowings,
  getUserHistory,
  getUserPerks,
  getUserProfile,
  postBookmarks,
  postComment,
  signIn,
  updateUser,
} from '../services/UserService';
import {useStore} from '../containers/StoreContainer';
import {ModalActionType} from '../containers/ModalAction';
import {AuthActionType} from '../containers/AuthAction';

// MUTATION requests

export function useUpdateUser(onSuccessCallback) {
  return useMutation({
    mutationFn: newLike => updateUser(newLike),
    onSuccess: ([{likes, comments}]) => {
      onSuccessCallback(likes, comments);
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function useDeletePost() {
  const {dispatch} = useStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: posts => deletePost(posts),
    onSuccess: () => {
      dispatch({type: ModalActionType.CLOSE});
      showMessage({message: 'Post deleted'});
      queryClient.invalidateQueries(['getUserPerks']);
      queryClient.invalidateQueries(['getPhotoVideo']);
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function usePostComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newComment => postComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(['getUserComments']);
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: comment => deleteComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries(['getUserComments']);
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function useAddPerk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: newPerk => addPerk(newPerk),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getUserExploring'],
      });
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function useAddFollowing(onSuccessCallback = () => {}) {
  return useMutation({
    mutationFn: following => addFollowing(following),
    onSuccess: () => onSuccessCallback(),
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function useDeleteFollowing(onSuccessCallback = () => {}) {
  return useMutation({
    mutationFn: following => deleteFollowing(following),
    onSuccess: () => onSuccessCallback(),
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function usePostBookmarks(onSuccessCallback = () => {}) {
  return useMutation({
    mutationFn: bookmark => postBookmarks(bookmark),
    onSuccess: () => onSuccessCallback(),
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

// QUERY requests

export function useGetUserComments(data) {
  return useQuery({
    queryKey: ['getUserComments', data],
    queryFn: getUserComments,
  });
}

export function useGetUserExploring(data) {
  return useQuery({
    queryKey: ['getUserExploring', data],
    queryFn: getUserExploring,
  });
}

export function useGetUserPerks(data) {
  return useQuery({
    queryKey: ['getUserPerks', data],
    queryFn: getUserPerks,
  });
}

export function useGetUserFeed(data) {
  return useQuery({
    queryKey: ['getUserFeed', data],
    queryFn: getUserFeed,
  });
}

export function useGetUserFollowings() {
  return useQuery({
    queryKey: ['getUserFollowings'],
    queryFn: getUserFollowings,
  });
}

export function useGetUserProfile(data) {
  return useQuery({
    queryKey: ['getUserProfile', data],
    queryFn: getUserProfile,
  });
}

export function useGetUserHistory(data) {
  return useQuery({
    queryKey: ['getUserHistory', data],
    queryFn: getUserHistory,
  });
}

export function useGetPhotoVideo(data) {
  return useQuery({
    queryKey: ['getPhotoVideo', data],
    queryFn: getPhotoVideo,
  });
}

export function useSignIn(data) {
  const queryClient = useQueryClient();
  const {dispatch} = useStore();

  return () => {
    queryClient
      .fetchQuery({
        queryKey: ['signin'],
        queryFn: () => signIn(data),
      })
      .then(result => {
        dispatch({type: AuthActionType.SIGN_IN, authResult: result});
      })
      .catch(({message}) => showMessage({message, type: 'danger'}));
  };
}
