import {useNavigation} from '@react-navigation/native';
import {useQuery} from '../../hooks/reactQueryHooks';
import StoryView from './StoryView';
import {getMy24} from '../../services/My24Service';
import PostItemList from '../../components/profile/PostItemList';
import {VIDEO_HEIGHT} from '../../components/profile/PostItem';
import Button from '../../components/common/buttons/Button';
import {VideoIcon} from '../../components/common/Icons';
import View from '../../components/common/View';
import {useColors} from '../../hooks/customHooks';
import AddStack from '../add/AddStack';
import NewMedia from '../add/NewMedia';

const ListEmptyComponent = () => {
  const {color, backgroundColor} = useColors();
  const navigation = useNavigation();

  return (
    <View style={{paddingVertical: 20}}>
      <Button
        title="Post a story"
        onPress={() =>
          navigation.navigate(AddStack.name, {
            screen: NewMedia.name,
          })
        }
        icon={<VideoIcon size={18} />}
        style={{alignSelf: 'center'}}
        theme={{color, backgroundColor}}
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
