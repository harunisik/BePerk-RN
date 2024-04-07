import {FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import PostItem from '../../components/profile/PostItem';
import FeaturedItemDetails from './FeaturedItemDetails';
import {useGetFeaturedFeed} from '../../hooks/featuredHooks';
import {useEffect, useRef} from 'react';

const COL_NUM = 3;

const Featured = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {initialPage},
  } = route;
  const flatListRef = useRef<FlatList>(null);

  const {data, fetchNextPage, isFetching, refetch, remove} =
    useGetFeaturedFeed();

  const handlePressItem = index => {
    navigation.navigate(FeaturedItemDetails.name, {index});
  };

  useEffect(() => {
    if (data?.length > 0) {
      flatListRef.current?.scrollToIndex({index: initialPage});
    }
  }, [data, initialPage]);

  console.log(initialPage);

  return (
    <FlatList
      ref={flatListRef}
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
      onScrollToIndexFailed={() => {}}
    />
  );
};

export default Featured;
