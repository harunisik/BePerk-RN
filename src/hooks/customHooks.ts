import {showMessage} from 'react-native-flash-message';
import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation as useRQMutation,
  useQuery as useRQQuery,
  useQueryClient,
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
  getUserProfile,
  postBookmarks,
  postComment,
  postUserLike,
} from '../services/UserService';
import {chatShare} from '../services/ChatService';
import {getMy24, postMy24Like} from '../services/My24Service';

const queryMap = {
  [postBookmarks.name]: [],
  [deletePost.name]: [getUserFeed.name, getUserExploring.name, getMy24.name],
  [postUserLike.name]: [],
  [postMy24Like.name]: [getMy24.name],
  [postComment.name]: [getUserComments.name],
  [deleteComment.name]: [getUserComments.name],
  [addPerk.name]: [getUserFeed.name, getUserExploring.name],
  [chatShare.name]: [],
  [addFollowing.name]: [getUserFollowing, getUserProfile],
  [deleteFollowing.name]: [getUserFollowing, getUserProfile],
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
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });
}

// QUERY requests

export function useQuery<
  TQueryFnData = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  data?: TQueryFnData,
  select?: (data: TQueryFnData) => TQueryFnData,
) {
  const queryKey = data ? [queryFn.name, data] : [queryFn.name];
  return useRQQuery({queryKey, queryFn, select});
}
