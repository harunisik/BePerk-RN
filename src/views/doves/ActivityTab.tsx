import {FlatList} from 'react-native';
import common from '../../styles/sharedStyles';
import {useGetUserHistory} from '../../hooks/userHooks';
import ActivityItem from '../../components/doves/ActivityItem';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useRoute} from '@react-navigation/native';

const ActivityTab = () => {
  const route = useRoute();
  const {
    params: {filter},
  } = route;
  const {p15} = common;

  const {data, refetch, isFetching} = useGetUserHistory({
    filter,
    limit: 50,
    offset: 0,
    onlyNew: 0,
  });

  return (
    <FlatList
      data={data?.history}
      renderItem={({item}) => <ActivityItem item={item} />}
      keyExtractor={item => item.history_id}
      onRefresh={refetch}
      refreshing={isFetching}
      ItemSeparatorComponent={<ItemSeperator medium />}
      contentContainerStyle={p15}
    />
  );
};

export default ActivityTab;
