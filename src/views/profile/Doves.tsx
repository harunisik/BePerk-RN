import {View, FlatList} from 'react-native';
import {getUserPerks} from '../../services/UserService';
import {useQuery} from 'react-query';
import {useStore} from '../../containers/StoreContainer';
import common from '../../styles/sharedStyles';
import {useState} from 'react';
import DovesItem from '../doves/DovesItem';
import DovesItemModal from '../doves/DovesItemModal';

const Doves = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState();
  const {flex1, jcCenter, aiCenter, dashed} = common;

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
    <View style={[flex1, jcCenter, aiCenter, dashed]}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <DovesItem
            item={item}
            navigation={navigation}
            onPressMore={setSelectedItem}
            displayUsername={false}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
      />
      <DovesItemModal item={selectedItem} onDeleteItem={refetch} />
    </View>
  );
};

export default Doves;
