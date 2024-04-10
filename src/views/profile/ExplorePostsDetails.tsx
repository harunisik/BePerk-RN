import PostDetailItemList from '../../components/profile/PostDetailItemList';
import {useGetUserExploring} from '../../hooks/infiniteQueryHooks';

const ExplorePostsDetails = () => {
  const {data, fetchNextPage, isFetching, refetch, remove} =
    useGetUserExploring(1, null, 50);

  return (
    <PostDetailItemList
      data={data}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={refetch}
      remove={remove}
    />
  );
};

export default ExplorePostsDetails;
