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
  postUserLike,
  UserLikeProps,
} from '../services/UserService';
import {useStore} from '../containers/StoreContainer';
import {AuthActionType} from '../containers/AuthAction';

// MUTATION requests

export function usePostUserLike(routeName: string) {
  return useCustomMutation(
    (like: UserLikeProps) => postUserLike(like),
    routeName,
  );
}

export function useDeletePost(routeName: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: posts => deletePost(posts),
    onMutate: async newTodo => {
      const options = queryClient.getDefaultOptions();
      const queryKey = options.queries.meta[routeName];
      const newItem = JSON.parse(newTodo.items);

      const previousTodos = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, old => {
        const result = old.exploring.filter(item => item.id !== newItem[0].id);
        return {exploring: result};
      });

      return {previousTodos, queryKey};
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(context.queryKey, context.previousTodos);
    },
    onSettled: (data, error, variables, context) => {
      // queryClient.invalidateQueries({queryKey: context.queryKey});
    },
    // onSuccess: () => invalidateQueries(queryClient, routeName),
    // onError: ({message}) => {
    //   showMessage({message, type: 'danger'});
    // },
  });
  // return useCustomMutation(posts => deletePost(posts), routeName);
}

export function usePostComment(routeName: string) {
  return useCustomMutation(comment => postComment(comment), routeName);
}

export function useDeleteComment(routeName: string) {
  return useCustomMutation(comment => deleteComment(comment), routeName);
}

export function useAddPerk(routeName: string) {
  return useCustomMutation(perk => addPerk(perk), routeName);
}

export function useAddFollowing(routeName: string) {
  return useCustomMutation(following => addFollowing(following), routeName);
}

export function useDeleteFollowing(routeName: string) {
  return useCustomMutation(following => deleteFollowing(following), routeName);
}

export function usePostBookmarks(routeName: string) {
  return useCustomMutation(bookmark => postBookmarks(bookmark), routeName);
}

function useCustomMutation(mutationFn, routeName) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => invalidateQueries(queryClient, routeName),
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

function invalidateQueries(queryClient, routeName) {
  const options = queryClient.getDefaultOptions();

  if (options.queries?.meta?.[routeName]) {
    queryClient.invalidateQueries(options.queries.meta[routeName]);
  }
}

// QUERY requests

export function useGetUserComments(routeName, data) {
  return useCustomQuery(['getUserComments', data], getUserComments, routeName);
}

export function useGetUserExploring(routeName, data) {
  console.log(data);
  return useCustomQuery(
    ['getUserExploring', data],
    getUserExploring,
    routeName,
  );
}

export function useGetUserPerks(routeName, data) {
  return useCustomQuery(['getUserPerks', data], getUserPerks, routeName);
}

export function useGetUserFeed(routeName, data) {
  return useCustomQuery(['getUserFeed', data], getUserFeed, routeName);
}

export function useGetUserFollowings(routeName) {
  return useCustomQuery(['getUserFollowings'], getUserFollowings, routeName);
}

export function useGetUserProfile(routeName, data) {
  return useCustomQuery(['getUserProfile', data], getUserProfile, routeName);
}

export function useGetUserHistory(routeName, data) {
  return useCustomQuery(['getUserHistory', data], getUserHistory, routeName);
}

export function useGetPhotoVideo(routeName, data) {
  return useCustomQuery(['getPhotoVideo', data], getPhotoVideo, routeName);
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

function useCustomQuery(queryKey, queryFn, routeName) {
  const queryClient = useQueryClient();
  queryClient.setDefaultOptions({queries: {meta: {[routeName]: queryKey}}});

  return useQuery({queryKey, queryFn});
}
