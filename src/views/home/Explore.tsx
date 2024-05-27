import {useGetUserExploring} from '../../hooks/infiniteQueryHooks';
import PostItemList from '../../components/profile/PostItemList';
import {useNavigation} from '@react-navigation/native';
import ExplorePostsDetails from '../profile/ExplorePostsDetails';

const Explore = () => {
  const navigation = useNavigation();
  const {data, fetchNextPage, isFetching, refetch, remove} =
    useGetUserExploring(1, null, 50);

  const handlePressItem = index => {
    navigation.navigate(ExplorePostsDetails.name, {index});
  };

  return (
    <PostItemList
      data={data}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      refetch={refetch}
      remove={remove}
      onPressItem={handlePressItem}
    />
  );
};

export default Explore;
