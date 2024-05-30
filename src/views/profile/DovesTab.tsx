import DovesItem from '../../components/doves/DovesItem';
import ItemSeperator from '../../components/common/ItemSpearator';
import common from '../../styles/sharedStyles';
import {useQuery} from '../../hooks/reactQueryHooks';
import {getUserPerks} from '../../services/UserService';
import {Tabs} from 'react-native-collapsible-tab-view';
import ListEmptyComponent from '../../components/common/ListEmptyComponent';
import {useCallback} from 'react';
import View from '../../components/common/View';

const {pt15} = common;

const DovesTab = ({userId, onRefresh}) => {
  const {data, refetch, isFetching} = useQuery(getUserPerks, {
    id: userId,
    limit: 35,
    offset: 0,
  });

  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator lineVisible large />,
    [],
  );

  return (
    <View style={pt15}>
      <Tabs.FlatList
        data={data}
        renderItem={({item}) => (
          <DovesItem item={item} displayUsername={false} />
        )}
        keyExtractor={item => item.id}
        onRefresh={() => {
          onRefresh();
          refetch();
        }}
        refreshing={isFetching}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default DovesTab;
