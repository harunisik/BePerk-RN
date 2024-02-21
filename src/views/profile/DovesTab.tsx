import {View, FlatList} from 'react-native';
import {useStore} from '../../containers/StoreContainer';
import DovesItem from '../../components/doves/DovesItem';
import {useGetUserPerks} from '../../hooks/userHooks';

const DovesTab = ({navigation}) => {
  const {
    store: {
      authResult: {id},
    },
  } = useStore();

  const {data, refetch, isFetching} = useGetUserPerks({
    id,
    limit: 35,
    offset: 0,
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
