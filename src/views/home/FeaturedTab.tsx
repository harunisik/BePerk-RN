import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getFeaturedFeed} from '../../services/UserService';
import common from '../../styles/sharedStyles';
import PostItem from '../../components/profile/PostItem';
import FeaturedItemDetails from './FeaturedItemDetails';
import {useInfiniteQuery} from 'react-query';
import {useMemo} from 'react';

const {pv5} = common;

const COL_NUM = 3;

const FeaturedTab = () => {
  const navigation = useNavigation();

  const {data, fetchNextPage, isFetching} = useInfiniteQuery({
    queryKey: ['getFeaturedFeed'],
    queryFn: ({pageParam = 0}) => {
      const limit = 5;
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
      // onRefresh={refetch}
      // refreshing={isFetching}
      onEndReached={() => !isFetching && fetchNextPage()}
      // onEndReachedThreshold={0.8}
      numColumns={COL_NUM}
      contentContainerStyle={pv5}
    />
  );
};

export default FeaturedTab;
