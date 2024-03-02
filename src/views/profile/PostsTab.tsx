import {FlatList} from 'react-native';
import {useGetPhotoVideo} from '../../hooks/userHooks';
import {useRoute} from '@react-navigation/native';
import PostItem from '../../components/profile/PostItem';
import {useEffect, useState} from 'react';
import common from '../../styles/sharedStyles';

const COL_NUM = 3;

const isDivideble = (num, div) => {
  return num % div === 0;
};

const PostsTab = () => {
  const [additionalData, setAdditionalData] = useState([]);
  const route = useRoute();
  const {
    params: {userId: id},
  } = route;
  const {pv5} = common;

  const {data, refetch, isFetching} = useGetPhotoVideo({
    id,
    limit: 35,
    offset: 0,
  });

  useEffect(() => {
    const length = data?.length;
    if (length && !isDivideble(length, COL_NUM)) {
      for (let index = 0; !isDivideble(length + index, COL_NUM); index++) {
        setAdditionalData(prev => [...prev, {id: length + index}]);
      }
    }
  }, [data]);

  return (
    <FlatList
      data={[...(data ? data : []), ...additionalData]}
      renderItem={({item}) => <PostItem item={item} />}
      keyExtractor={item => item.id}
      onRefresh={refetch}
      refreshing={isFetching}
      numColumns={COL_NUM}
      contentContainerStyle={pv5}
    />
  );
};

export default PostsTab;
