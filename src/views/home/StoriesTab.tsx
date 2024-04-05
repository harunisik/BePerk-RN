import {View, FlatList, Text} from 'react-native';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {getMy24} from '../../services/UserService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import {Fragment, useMemo} from 'react';
import {appendData} from '../../utils/DataUtil';
import {useNavigation} from '@react-navigation/native';
import StoryView from '../profile/StoryView';
import CircleGradientBorder from '../../components/common/CircleGradientBorder';
import {useStore} from '../../containers/StoreContainer';

const COL_NUM = 4;

const {bold, row, flex1, p5, p10, font12, aiCenter} = common;

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
    <View style={[flex1, p5, aiCenter]}>
      {item.my24List && (
        <Fragment>
          <CircleGradientBorder
            disabled={item.my24List.some(my24Item => my24Item.showing === 1)}>
            <MaterialCommunityIcons
              name="account"
              size={40}
              color="white"
              onPress={onPress}
              style={p10}
            />
          </CircleGradientBorder>
          <View style={[row]}>
            <Text
              style={[
                bold,
                font12,
                {color: isMyStory ? 'dodgerblue' : 'black'},
              ]}
              numberOfLines={1}>
              {isMyStory ? 'My story' : item.fullname}
            </Text>
            {item.isVerified === 1 && (
              <MaterialIcons name="verified" size={16} color="dodgerblue" />
            )}
          </View>
        </Fragment>
      )}
    </View>
  );
};

const StoriesTab = () => {
  const navigation = useNavigation();
  const {
    store: {
      authResult: {id: userId},
    },
  } = useStore();
  const {data, refetch, isFetching} = useQuery(getMy24);

  const result = useMemo(
    () => transformMy24List(data?.my24, item => item.user_id),
    [data],
  );

  const newData = appendData(result, 'user_id', COL_NUM);

  const handlePressItem = (item, index) => {
    if (data.my24.length > index) {
      navigation.navigate(StoryView.name, {
        data: item.my24List,
        index: 0,
        userId: item.user_id,
      });
    }
  };

  return (
    <FlatList
      data={newData}
      renderItem={({item, index}) => (
        <StoriesItem
          item={item}
          onPress={() => handlePressItem(item, index)}
          isMyStory={item.user_id === userId}
        />
      )}
      keyExtractor={item => item.user_id}
      onRefresh={refetch}
      refreshing={isFetching}
      numColumns={COL_NUM}
      contentContainerStyle={p5}
    />
  );
};

export default StoriesTab;
