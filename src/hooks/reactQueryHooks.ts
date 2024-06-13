import {showMessage} from 'react-native-flash-message';
import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation as useRQMutation,
  useQuery as useRQQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query';
import {
  addFollowing,
  addPerk,
  deleteComment,
  deleteFollowing,
  deletePost,
  getUserComments,
  getUserExploring,
  getUserFeed,
  getUserFollowing,
  getUserPerks,
  getUserProfile,
  postBookmarks,
  postComment,
  postProfile,
  postUserLike,
} from '../services/UserService';
import {
  chatDelete,
  chatListOpen,
  chatSend,
  chatShare,
  getChat,
} from '../services/ChatService';
import {getMy24, postMy24, postMy24Like} from '../services/My24Service';

const queryMap = {
  // [postProfile.name]: [getUserProfile.name],
  [postBookmarks.name]: [],
  [deletePost.name]: [
    getUserFeed.name,
    getUserExploring.name,
    getMy24.name,
    getUserPerks.name,
  ],
  [postUserLike.name]: [],
  [postMy24Like.name]: [getMy24.name],
  [postMy24.name]: [getMy24.name],
  [postComment.name]: [getUserComments.name],
  [deleteComment.name]: [getUserComments.name],
  [addPerk.name]: [getUserFeed.name, getUserExploring.name],
  [chatShare.name]: [],
  [chatSend.name]: [getChat.name, chatListOpen.name],
  [chatDelete.name]: [chatListOpen.name],
  [addFollowing.name]: [getUserFollowing.name, getUserProfile.name],
  [deleteFollowing.name]: [getUserFollowing.name, getUserProfile.name],
};

// getUserHistory
// getUserComment
// getUserExploring
// getUserPerks
// getUserFeed
// getUserFollowing
// getPhotoVideo
// getUserProfile

// MUTATION requests

export function useMutation<TData = unknown, TVariables = void>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient();

  return useRQMutation({
    mutationFn,
    onSuccess: () => {
      queryMap[mutationFn.name]?.forEach(item => {
        queryClient.invalidateQueries({queryKey: item});
      });
    },
    onError: error => {
      showMessage({message: error.message ?? error, type: 'danger'});
    },
  });
}

// QUERY requests

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  data?: TQueryFnData,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
) {
  const queryKey = data ? [queryFn.name, data] : [queryFn.name];
  return useRQQuery(queryKey, queryFn, options);
}
