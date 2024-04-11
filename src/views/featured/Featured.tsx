import {useNavigation} from '@react-navigation/native';
import FeaturedItemDetails from './FeaturedItemDetails';
import {useGetFeaturedFeed} from '../../hooks/infiniteQueryHooks';
import PostItemList from '../../components/profile/PostItemList';

const Featured = () => {
  const navigation = useNavigation();

  const {data, fetchNextPage, isFetching, refetch, remove} =
    useGetFeaturedFeed();

  const handlePressItem = index => {
    navigation.navigate(FeaturedItemDetails.name, {index});
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

export default Featured;
