import {FlatList} from 'react-native';
import {useGetPhotoVideo} from '../../hooks/userHooks';
import {useRoute} from '@react-navigation/native';
import common from '../../styles/sharedStyles';
import PostsDetailsItem from '../../components/profile/PostsDetailsItem';
import ItemSeperator from '../../components/common/ItemSpearator';

const PostsDetails = () => {
  const route = useRoute();
  // const {
  //   params: {userId: id},
  // } = route;

  const {data, refetch, isFetching} = useGetPhotoVideo({
    id: 170763,
    limit: 35,
    offset: 0,
  });

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <PostsDetailsItem item={item} />}
      keyExtractor={item => item.id}
      onRefresh={refetch}
      refreshing={isFetching}
      ItemSeparatorComponent={<ItemSeperator lineVisible />}
    />
  );
};

export default PostsDetails;
