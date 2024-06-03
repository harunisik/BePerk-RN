import common from '../../styles/sharedStyles';
import ActivityItem from '../../components/doves/ActivityItem';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '../../hooks/reactQueryHooks';
import {getUserHistory} from '../../services/UserService';
import FlatList from '../../components/common/FlatList';
import View from '../../components/common/View';

const {p15, flex1} = common;

const ActivityTab = () => {
  const route = useRoute();
  const {
    params: {filter},
  } = route;

  const {data, refetch, isFetching} = useQuery(getUserHistory, {
    filter,
    limit: 50,
    offset: 0,
    onlyNew: 0,
  });

  return (
    <View style={flex1}>
      <FlatList
        data={data?.history}
        renderItem={({item}) => <ActivityItem item={item} />}
        keyExtractor={item => item.history_id}
        onRefresh={refetch}
        refreshing={isFetching}
        contentContainerStyle={p15}
      />
    </View>
  );
};

export default ActivityTab;
