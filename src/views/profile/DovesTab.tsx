import DovesItem from '../../components/doves/DovesItem';
import ItemSeperator from '../../components/common/ItemSpearator';
import common from '../../styles/sharedStyles';
import {useQuery} from '../../hooks/reactQueryHooks';
import {getUserPerks} from '../../services/UserService';
import {Tabs} from 'react-native-collapsible-tab-view';
import {useCallback} from 'react';
import View from '../../components/common/View';
import ListEmptyComponent from '../../components/common/ListEmptyComponent';
import {Loader} from '../doves/HomeTab';
import {useDelay} from '../../hooks/customHooks';

const {pt15} = common;

const DovesTab = ({userId, onRefresh}) => {
  const {isLoading} = useDelay();

  const {data, refetch, isFetching} = useQuery(getUserPerks, {
    id: userId,
    limit: 35,
    offset: 0,
  });

  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator lineVisible size="large" />,
    [],
  );

  return (
    <View style={pt15}>
      {(isLoading && isFetching) || isLoading ? (
        <Loader />
      ) : (
        <Tabs.FlatList
          data={data}
          renderItem={({item}) => <DovesItem item={item} />}
          keyExtractor={item => item.id}
          onRefresh={() => {
            onRefresh();
            refetch();
          }}
          refreshing={isFetching}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={ListEmptyComponent}
        />
      )}
    </View>
  );
};

export default DovesTab;
