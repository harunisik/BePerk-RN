import {View, FlatList} from 'react-native';
import common from '../../styles/sharedStyles';
import {useGetUserHistory} from '../../hooks/userHooks';
import ActivityItem from '../../components/doves/ActivityItem';

const ActivityTab = ({navigation, route}) => {
  const {flex1, p15} = common;
  const {
    params: {filter},
  } = route;

  const {data, refetch, isFetching} = useGetUserHistory({
    filter,
    limit: 50,
    offset: 0,
    onlyNew: 0,
  });

  return (
    <View style={[flex1, p15]}>
      <FlatList
        data={data?.history}
        renderItem={({item}) => (
          <ActivityItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.history_id}
        onRefresh={refetch}
        refreshing={isFetching}
      />
    </View>
  );
};

export default ActivityTab;
