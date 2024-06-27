import {useNavigation} from '@react-navigation/native';
import {useQuery} from '../../hooks/reactQueryHooks';
import StoryView from './StoryView';
import {getMy24} from '../../services/My24Service';
import PostItemList from '../../components/profile/PostItemList';
import {VIDEO_HEIGHT} from '../../components/profile/PostItem';
import Button from '../../components/common/buttons/Button';
import {VideoIcon} from '../../components/common/Icons';
import {ImageVideoSelectionModal} from '../add/AddModal';
import NewStory from '../add/NewStory';
import {useState} from 'react';
import View from '../../components/common/View';
import {useColors} from '../../hooks/customHooks';

const ListEmptyComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {color, backgroundColor} = useColors();

  return (
    <View style={{paddingVertical: 20}}>
      <Button
        title="Post a story"
        onPress={() => setModalVisible(true)}
        icon={<VideoIcon size={18} />}
        style={{alignSelf: 'center'}}
        theme={{color, backgroundColor}}
      />
      <ImageVideoSelectionModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        navigateTo={NewStory.name}
      />
    </View>
  );
};

const StoriesTab = ({userId, onRefresh}) => {
  const navigation = useNavigation();
  const {data, isFetching, refetch} = useQuery(getMy24, {
    id: userId,
  });

  const handlePressItem = index => {
    navigation.navigate(StoryView.name, {data: data.my24, index, userId});
  };

  return (
    <PostItemList
      data={data?.my24}
      isFetching={isFetching}
      refetch={() => {
        onRefresh();
        refetch();
      }}
      onPressItem={handlePressItem}
      useTabView
      imageHeight={VIDEO_HEIGHT}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default StoriesTab;
