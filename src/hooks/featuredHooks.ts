import {useInfiniteQuery} from 'react-query';
import {getFeaturedFeed} from '../services/UserService';
import {useMemo} from 'react';

// MUTATION requests

// QUERY requests

export function useGetFeaturedFeed(initialData = undefined) {
  const {data, fetchNextPage, isFetching, refetch, remove} = useInfiniteQuery({
    queryKey: [getFeaturedFeed.name],
    queryFn: ({pageParam = 0}) => {
      const limit = 25;
      return getFeaturedFeed(limit, limit * pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.count > 0 ? pages.length : undefined;
    },
    ...(initialData ? {initialData} : {}),
    staleTime: 100000,
  });

  const newData = useMemo(
    () =>
      data?.pages.flatMap((element, index, array) => {
        // console.log(item);
        // console.log(index);
        // console.log(JSON.stringify(index));
        return element.feed.map(item => {
          return {...item, pageNumber: index};
        });
      }),
    [data],
  );

  return {data: newData, fetchNextPage, isFetching, refetch, remove};
}
