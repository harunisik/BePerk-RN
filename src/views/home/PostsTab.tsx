import {useGetUserFeed} from '../../hooks/infiniteQueryHooks';
import PostDetailItemList from '../../components/profile/PostDetailItemList';

const PostsTab = () => {
  const {data, fetchNextPage, isFetching, refetch, remove} = useGetUserFeed(1);

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

export default PostsTab;
