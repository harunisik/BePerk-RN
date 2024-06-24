import DovesItem from '../../components/doves/DovesItem';
import ItemSeperator from '../../components/common/ItemSpearator';
import common from '../../styles/sharedStyles';
import {useQuery} from '../../hooks/reactQueryHooks';
import {getUserPerks} from '../../services/UserService';
import {Tabs} from 'react-native-collapsible-tab-view';
import {useCallback, useState} from 'react';
import View from '../../components/common/View';
import {Loader} from '../doves/HomeTab';
import {useColors, useDelay} from '../../hooks/customHooks';
import Button from '../../components/common/buttons/Button';
import {FileIcon} from '../../components/common/Icons';
import {AddDoveModal} from '../add/AddModal';

const {pt15} = common;

const ListEmptyComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {color, backgroundColor} = useColors();

  return (
    <View style={{paddingVertical: 10}}>
      <Button
        title="Post your first dove"
        onPress={() => setModalVisible(true)}
        icon={<FileIcon size={18} />}
        style={{alignSelf: 'center'}}
        theme={{color, backgroundColor}}
      />
      <AddDoveModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
    </View>
  );
};

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
