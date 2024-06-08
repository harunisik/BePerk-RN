import {useGetUserFeed} from '../../hooks/infiniteQueryHooks';
import PostDetailItemList from '../../components/profile/PostDetailItemList';
import View from '../../components/common/View';

const PostsTab = () => {
  const {data, fetchNextPage, isFetching, refetch, remove} = useGetUserFeed(1);

  return (
    <View style={{flex: 1}}>
      <PostDetailItemList
        data={data}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        refetch={refetch}
        remove={remove}
      />
    </View>
  );
};

export default PostsTab;
