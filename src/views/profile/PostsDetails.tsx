import {FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import PostsDetailsItem from '../../components/profile/PostsDetailsItem';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useEffect, useRef} from 'react';

const PostsDetails = () => {
  const flatList = useRef<FlatList>(null);
  const route = useRoute();
  const {
    params: {data, index},
  } = route;

  const handleScrollToIndexFailed = ({index}) => {
    const wait = new Promise(resolve => setTimeout(resolve, 100));
    wait.then(() => {
      flatList.current?.scrollToIndex({index, animated: false});
    });
  };

  useEffect(() => {
    flatList.current?.scrollToIndex({index: index, animated: false});
  }, [index]);

  return (
    <FlatList
      ref={flatList}
      data={data}
      renderItem={({item}) => <PostsDetailsItem item={item} />}
      keyExtractor={item => item.id}
      // onRefresh={refetch}
      // refreshing={isFetching}
      ItemSeparatorComponent={<ItemSeperator lineVisible />}
      onScrollToIndexFailed={handleScrollToIndexFailed}
    />
  );
};

export default PostsDetails;
