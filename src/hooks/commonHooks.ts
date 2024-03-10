import {showMessage} from 'react-native-flash-message';
import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

// MUTATION requests

export function useCustomMutation<TData = unknown, TVariables = void>(
  mutationFn: MutationFunction<TData, TVariables>,
  routeName?: string,
) {
  const queryClient = useQueryClient();
  const options = queryClient.getDefaultOptions();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      if (routeName) {
        const queryKey = options.queries?.meta?.[routeName];
        if (queryKey) {
          queryClient.invalidateQueries({queryKey});
        }
      }
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
>(
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  data?: TQueryFnData,
  routeName?: string,
) {
  const queryKey = data ? [queryFn.name, data] : [queryFn.name];
  const queryClient = useQueryClient();
  const options = queryClient.getDefaultOptions();

  if (routeName) {
    queryClient.setDefaultOptions({
      queries: {meta: {...options.queries?.meta, [routeName]: queryKey}},
    });
  }

  return useQuery({queryKey, queryFn});
}
