import {View, FlatList} from 'react-native';
import {getUserPerks} from '../../services/UserService';
import {useQuery} from 'react-query';
import {useStore} from '../../containers/StoreContainer';
import DovesItem from '../../components/doves/DovesItem';

const DovesTab = ({navigation}) => {
  const {
    store: {
      authResult: {id},
    },
  } = useStore();

  const {data, refetch, isFetching} = useQuery({
    queryKey: ['getUserPerks', {id, limit: 35, offset: 0}],
    queryFn: getUserPerks,
  });

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <DovesItem
            item={item}
            navigation={navigation}
            displayUsername={false}
            onDeleteItem={refetch}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
      />
    </View>
  );
};

export default DovesTab;
