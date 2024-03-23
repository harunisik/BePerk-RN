import {showMessage} from 'react-native-flash-message';
import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import {
  addFollowing,
  addPerk,
  deleteComment,
  deleteFollowing,
  deletePost,
  getMy24,
  getUserComments,
  getUserExploring,
  getUserFeed,
  postBookmarks,
  postComment,
  postMy24Like,
  postUserLike,
} from '../services/UserService';
import {chatShare} from '../services/ChatService';

const queryMap = {
  [postBookmarks.name]: [],
  [deletePost.name]: [getUserFeed.name, getUserExploring.name, getMy24.name],
  [postUserLike.name]: [],
  [postMy24Like.name]: [getMy24.name],
  [postComment.name]: [getUserComments.name],
  [deleteComment.name]: [getUserComments.name],
  [addPerk.name]: [getUserFeed.name, getUserExploring.name],
  [chatShare.name]: [],
  [addFollowing.name]: [],
  [deleteFollowing.name]: [],
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

export function useCustomMutation<TData = unknown, TVariables = void>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient();

  return useMutation({
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

export function useCustomQuery<
  TQueryFnData = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(queryFn: QueryFunction<TQueryFnData, TQueryKey>, data?: TQueryFnData) {
  const queryKey = data ? [queryFn.name, data] : [queryFn.name];
  return useQuery({queryKey, queryFn});
}
