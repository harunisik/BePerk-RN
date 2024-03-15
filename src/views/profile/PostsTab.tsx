import {FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import PostItem from '../../components/profile/PostItem';
import common from '../../styles/sharedStyles';
import PostsDetails from './PostsDetails';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {getPhotoVideo} from '../../services/UserService';
import {appendData} from '../../utils/DataUtil';

const COL_NUM = 3;

const PostsTab = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {userId: id},
  } = route;
  const {pv5} = common;

  const {data, refetch, isFetching} = useQuery(getPhotoVideo, {
    id,
    limit: 35,
    offset: 0,
  });

  const {length} = appendData(data);

  const handlePressItem = (index, item) => {
    if (length > index) {
      navigation.navigate(PostsDetails.name, {data, index, item});
    }
  };

  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <PostItem item={item} onPress={() => handlePressItem(index, item)} />
      )}
      keyExtractor={item => item.id}
      onRefresh={refetch}
      refreshing={isFetching}
      numColumns={COL_NUM}
      contentContainerStyle={pv5}
    />
  );
};

export default PostsTab;
