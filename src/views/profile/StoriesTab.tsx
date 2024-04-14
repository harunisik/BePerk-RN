import {useNavigation} from '@react-navigation/native';
import PostItem from '../../components/profile/PostItem';
import common from '../../styles/sharedStyles';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {getMy24} from '../../services/UserService';
import StoryView from './StoryView';
import {Tabs} from 'react-native-collapsible-tab-view';

const {pv5} = common;
const COL_NUM = 3;

const StoriesTab = ({userId}) => {
  const navigation = useNavigation();
  const {data, refetch, isFetching} = useQuery(getMy24, {id: userId});

  const handlePressItem = index => {
    navigation.navigate(StoryView.name, {data: data.my24, index, userId});
  };

  return (
    <Tabs.FlatList
      data={data?.my24}
      renderItem={({item, index}) => (
        <PostItem item={item} onPress={() => handlePressItem(index)} />
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
