import {showMessage} from 'react-native-flash-message';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  addPerk,
  deleteComment,
  deletePost,
  getUserComments,
  getUserExploring,
  getUserFeed,
  getUserFollowings,
  getUserHistory,
  getUserPerks,
  getUserProfile,
  postComment,
  signIn,
  updateUser,
} from '../services/UserService';
import {useStore} from '../containers/StoreContainer';
import {ModalActionType} from '../containers/ModalAction';
import {AuthActionType} from '../containers/AuthAction';

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

export function useDeletePost(onSuccessCallback) {
  const {dispatch} = useStore();

  return useMutation({
    mutationFn: posts => deletePost(posts),
    onSuccess: () => {
      dispatch({type: ModalActionType.CLOSE});
      showMessage({message: 'Message deleted'});
      onSuccessCallback();
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function usePostComment(onSuccessCallback) {
  return useMutation({
    mutationFn: newComment => postComment(newComment),
    onSuccess: () => onSuccessCallback(),
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function useDeleteComment(onSuccessCallback) {
  return useMutation({
    mutationFn: comment => deleteComment(comment),
    onSuccess: () => onSuccessCallback(),
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

export function useAddPerk(onSuccessCallback) {
  return useMutation({
    mutationFn: newPerk => addPerk(newPerk),
    onSuccess: () => onSuccessCallback(),
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

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
