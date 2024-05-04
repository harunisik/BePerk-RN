import {View} from 'react-native';
import DovesItem from '../../components/doves/DovesItem';
import ItemSeperator from '../../components/common/ItemSpearator';
import common from '../../styles/sharedStyles';
import {useCustomQuery as useQuery} from '../../hooks/customHooks';
import {getUserPerks} from '../../services/UserService';
import {Tabs} from 'react-native-collapsible-tab-view';
import ListEmptyComponent from '../../components/common/ListEmptyComponent';

const {pt15} = common;

const DovesTab = ({userId}) => {
  const {data, refetch, isFetching} = useQuery(getUserPerks, {
    id: userId,
    limit: 35,
    offset: 0,
  });

  return (
    <View style={pt15}>
      <Tabs.FlatList
        data={data}
        renderItem={({item}) => (
          <DovesItem item={item} displayUsername={false} />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
        ItemSeparatorComponent={<ItemSeperator lineVisible large />}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default DovesTab;
