import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getFeaturedFeed} from '../../services/UserService';
import common from '../../styles/sharedStyles';
import PostItem from '../../components/profile/PostItem';
import FeaturedItemDetails from './FeaturedItemDetails';
import {useInfiniteQuery} from 'react-query';
import {useMemo} from 'react';

const COL_NUM = 3;

const Featured = () => {
  const navigation = useNavigation();

  const {data, fetchNextPage, isFetching, refetch, remove} = useInfiniteQuery({
    queryKey: ['getFeaturedFeed'],
    queryFn: ({pageParam = 0}) => {
      const limit = 25;
      return getFeaturedFeed(limit, limit * pageParam);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.count > 0 ? pages.length : undefined;
    },
  });

  const newData = useMemo(() => data?.pages.flatMap(({feed}) => feed), [data]);

  const handlePressItem = index => {
    navigation.navigate(FeaturedItemDetails.name, {data: newData, index});
  };

  return (
    <FlatList
      data={newData}
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
