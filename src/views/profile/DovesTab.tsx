import {View, FlatList} from 'react-native';
import DovesItem from '../../components/doves/DovesItem';
import ItemSeperator from '../../components/common/ItemSpearator';
import common from '../../styles/sharedStyles';
import {useRoute} from '@react-navigation/native';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {getUserPerks} from '../../services/UserService';

const DovesTab = () => {
  const route = useRoute();
  const {
    params: {userId: id},
  } = route;

  const {data, refetch, isFetching} = useQuery(
    getUserPerks,
    {id, limit: 35, offset: 0},
    route.key,
  );

  const {pt15} = common;

  return (
    <View style={pt15}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <DovesItem item={item} displayUsername={false} />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
        ItemSeparatorComponent={<ItemSeperator lineVisible large />}
      />
    </View>
  );
};

export default DovesTab;
