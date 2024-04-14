import {View, FlatList} from 'react-native';
import DovesItem from '../../components/doves/DovesItem';
import ItemSeperator from '../../components/common/ItemSpearator';
import common from '../../styles/sharedStyles';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {getUserPerks} from '../../services/UserService';
import {Tabs} from 'react-native-collapsible-tab-view';

const DovesTab = ({userId}) => {
  const {data, refetch, isFetching} = useQuery(getUserPerks, {
    id: userId,
    limit: 35,
    offset: 0,
  });

  const {pt15} = common;

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
      />
    </View>
  );
};

export default DovesTab;
