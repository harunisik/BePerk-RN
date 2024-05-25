import {useNavigation} from '@react-navigation/native';
import {useQuery} from '../../hooks/customHooks';
import StoryView from './StoryView';
import {getMy24} from '../../services/My24Service';
import PostItemList from '../../components/profile/PostItemList';
import {VIDEO_HEIGHT} from '../../components/profile/PostItem';

const StoriesTab = ({userId, onRefresh}) => {
  const navigation = useNavigation();
  const {data, refetch, isFetching} = useQuery(getMy24, {id: userId});

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
    />
  );
};

export default StoriesTab;
