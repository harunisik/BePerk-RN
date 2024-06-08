import {Pressable} from 'react-native';
import {useQuery} from '../../hooks/reactQueryHooks';
import common from '../../styles/sharedStyles';
import {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import StoryView from '../profile/StoryView';
import {useStore} from '../../containers/StoreContainer';
import {getMy24} from '../../services/My24Service';
import FlatList from '../../components/common/FlatList';
import AccountCard from '../../components/common/AccountCard';
import View from '../../components/common/View';

const COL_NUM = 4;

const {flex1, p5, aiCenter} = common;

const transformMy24List = (data, func) => {
  if (!data) return null;
  return Object.entries(
    data.reduce((acc, item) => {
      (acc[func(item)] ||= []).push(item);
      return acc;
    }, {}),
  ).map(([, value]) => {
    return {
      my24List: value,
      isVerified: value[0].isVerified,
      user_id: value[0].user_id,
      fullname: value[0].fullname,
    };
  });
};

const StoriesItem = ({item, onPress, isMyStory = false}) => {
  return (
    <View style={[{flex: 1 / COL_NUM}, p5, aiCenter]}>
      <Pressable
        onPress={onPress}
        onStartShouldSetResponderCapture={_event => true}>
        <AccountCard
          userId={item.user_id}
          username={isMyStory ? 'My story' : item.fullname}
          photo={item.photo}
          bordered={item.my24List.some(({showing}) => showing === 0)}
          vertical
          size={40}
          disableNavigation
        />
      </Pressable>
    </View>
  );
};

const StoriesTab = () => {
  const navigation = useNavigation();
  const {
    store: {
      userInfo: {userId},
    },
  } = useStore();
  const {data, refetch, isFetching} = useQuery(getMy24);

  const result = useMemo(
    () => transformMy24List(data?.my24, item => item.user_id),
    [data],
  );

  const handlePressItem = item => {
    navigation.navigate(StoryView.name, {
      data: item.my24List,
      index: 0,
      userId: item.user_id,
    });
  };

  return (
    <View style={flex1}>
      <FlatList
        data={result}
        renderItem={({item}) => (
          <StoriesItem
            item={item}
            onPress={() => handlePressItem(item)}
            isMyStory={item.user_id === userId}
          />
        )}
        keyExtractor={item => item.user_id}
        onRefresh={refetch}
        refreshing={isFetching}
        numColumns={COL_NUM}
        contentContainerStyle={p5}
      />
    </View>
  );
};

export default StoriesTab;
