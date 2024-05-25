import {useRoute} from '@react-navigation/native';
import PostDetailItemList from '../../components/profile/PostDetailItemList';
import {useGetUserExploring} from '../../hooks/infiniteQueryHooks';

const ExplorePostsDetails = () => {
  const route = useRoute();
  const {
    params: {index},
  } = route;
  const {data, fetchNextPage, isFetching, refetch, remove} =
    useGetUserExploring(1, null, 50);

  return (
    <PostDetailItemList
      data={data}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={refetch}
      remove={remove}
      initialScrollIndex={index}
    />
  );
};

export default ExplorePostsDetails;
