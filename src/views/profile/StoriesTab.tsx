import {useNavigation} from '@react-navigation/native';
import PostItem, {IMAGE_HEIGHT} from '../../components/profile/PostItem';
import common from '../../styles/sharedStyles';
import {useCustomQuery as useQuery} from '../../hooks/customHooks';
import StoryView from './StoryView';
import {Tabs} from 'react-native-collapsible-tab-view';
import {getMy24} from '../../services/My24Service';
import ListEmptyComponent from '../../components/common/ListEmptyComponent';

const {pv5} = common;
const COL_NUM = 3;

const StoriesTab = ({userId}) => {
  const navigation = useNavigation();
  const {data, refetch, isFetching} = useQuery(getMy24, {id: userId});

  const handlePressItem = index => {
    navigation.navigate(StoryView.name, {data: data.my24, index, userId});
  };

  return (
    <Tabs.MasonryFlashList
      data={data?.my24}
      renderItem={({item, index}) => (
        <PostItem item={item} onPress={() => handlePressItem(index)} />
      )}
      keyExtractor={item => item.id}
      onRefresh={refetch}
      refreshing={isFetching}
      numColumns={COL_NUM}
      estimatedItemSize={IMAGE_HEIGHT}
      contentContainerStyle={pv5}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default StoriesTab;
