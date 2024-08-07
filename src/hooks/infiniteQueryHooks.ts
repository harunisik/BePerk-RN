import {useInfiniteQuery} from 'react-query';
import {
  getFeaturedFeed,
  getUserPhotoVideo,
  getUserExploring,
  getUserFeed,
} from '../services/UserService';
import {useMemo} from 'react';

// MUTATION requests

// QUERY requests

export function useGetFeaturedFeed() {
  const {data, isFetching, fetchNextPage, refetch, remove} = useInfiniteQuery({
    queryKey: [getFeaturedFeed.name],
    queryFn: ({pageParam = 0}) => {
      const limit = 25;
      return getFeaturedFeed(limit, limit * pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.count > 0 ? pages.length : undefined;
    },
    staleTime: Infinity,
  });

  const newData = useMemo(() => data?.pages.flatMap(({feed}) => feed), [data]);

  return {
    data: newData,
    isFetching,
    fetchNextPage,
    refetch,
    remove,
  };
}

export function useGetUserFeed(filter: number, limit: number = 25) {
  const {data, isFetching, fetchNextPage, refetch, remove} = useInfiniteQuery({
    queryKey: [getUserFeed.name, filter],
    queryFn: ({pageParam = 0}) => {
      return getUserFeed(filter, limit, limit * pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.feed?.length > 0 ? pages.length : undefined;
    },
  });

  const newData = useMemo(() => data?.pages.flatMap(({feed}) => feed), [data]);

  return {
    data: newData,
    isFetching,
    fetchNextPage,
    refetch,
    remove,
  };
}

export function useGetUserExploring(
  filter: number,
  subtype: number | null,
  limit: number = 25,
) {
  const {data, fetchNextPage, isFetching, refetch, remove} = useInfiniteQuery({
    queryKey: [getUserExploring.name, filter, subtype],
    queryFn: ({pageParam = 0}) => {
      return getUserExploring(filter, subtype, limit, limit * pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.count > 0 ? pages.length : undefined;
    },
    staleTime: Infinity,
  });

  const newData = useMemo(
    () => data?.pages.flatMap(({exploring}) => exploring),
    [data],
  );

  return {
    data: newData,
    fetchNextPage,
    isFetching,
    refetch,
    remove,
  };
}

export function useGetUserPhotoVideo(id: number, limit: number = 25) {
  const {data, isFetching, hasNextPage, fetchNextPage, refetch, remove} =
    useInfiniteQuery({
      queryKey: [getUserPhotoVideo.name, id],
      queryFn: ({pageParam = 0}) => {
        return getUserPhotoVideo(id, limit, limit * pageParam);
      },
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length > 0 ? pages.length : undefined;
      },
      staleTime: Infinity,
    });

  const newData = useMemo(
    () =>
      data?.pages.flat().map(item => {
        return {...item, user_id: id};
      }),
    [data],
  );

  return {
    data: newData,
    isFetching,
    hasNextPage,
    fetchNextPage,
    refetch,
    remove,
  };
}
