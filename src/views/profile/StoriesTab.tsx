import {FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import PostItem from '../../components/profile/PostItem';
import common from '../../styles/sharedStyles';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {getMy24} from '../../services/UserService';
import {appendData} from '../../utils/DataUtil';
import StoryView from './StoryView';

const COL_NUM = 3;

const StoriesTab = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    params: {userId: id},
  } = route;
  const {pv5} = common;

  const {data, refetch, isFetching} = useQuery(getMy24, {id});

  const newData = appendData(data?.my24);

  const handlePressItem = (index, item) => {
    if (data.my24.length > index) {
      navigation.navigate(StoryView.name, {data: data.my24, index, item});
    }
  };

  return (
    <FlatList
      data={newData}
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

export default StoriesTab;
