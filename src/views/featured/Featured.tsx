import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PostItem from '../../components/profile/PostItem';
import FeaturedItemDetails from './FeaturedItemDetails';
import {useGetFeaturedFeed} from '../../hooks/featuredHooks';

const COL_NUM = 3;

const Featured = () => {
  const navigation = useNavigation();

  const {data, fetchNextPage, isFetching, refetch, remove} =
    useGetFeaturedFeed();

  const handlePressItem = index => {
    navigation.navigate(FeaturedItemDetails.name, {index});
  };

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <PostItem item={item} onPress={() => handlePressItem(index)} />
      )}
      keyExtractor={item => item.id}
      onRefresh={() => {
        remove();
        refetch();
      }}
      refreshing={isFetching}
      onEndReached={() => !isFetching && fetchNextPage()}
      numColumns={COL_NUM}
    />
  );
};

export default Featured;
