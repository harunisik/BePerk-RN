import {View, FlatList} from 'react-native';
import DovesItem from '../../components/doves/DovesItem';
import {useGetUserPerks} from '../../hooks/userHooks';
import ItemSeperator from '../../components/common/ItemSpearator';
import common from '../../styles/sharedStyles';

const DovesTab = ({navigation, route}) => {
  const {
    params: {userId: id},
  } = route;

  const {data, refetch, isFetching} = useGetUserPerks({
    id,
    limit: 35,
    offset: 0,
  });

  const {pt15} = common;

  return (
    <View style={pt15}>
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
        ItemSeparatorComponent={<ItemSeperator lineVisible large />}
      />
    </View>
  );
};

export default DovesTab;
