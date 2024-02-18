import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';
import common from '../../styles/sharedStyles';
import {getUserExploring} from '../../services/UserService';
import {useQuery} from 'react-query';
import DovesItem from './DovesItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ListHeaderComponent = ({navigation, route}) => {
  const {row, jcCenter, aiCenter, cGap10} = common;
  const {
    params: {subtype},
  } = route;

  return (
    <TouchableOpacity
      style={[styles.button, aiCenter, jcCenter, row, cGap10]}
      onPress={() => {
        Alert.alert('clicked');
      }}>
      <MaterialCommunityIcons
        name="file-document-edit-outline"
        size={26}
        color="blue"
      />
      <Text>
        {subtype === 0
          ? "Post what's on your mind"
          : subtype === 1
          ? 'Write what God has done for you!'
          : subtype === 2
          ? 'Share a prayer request!'
          : 'Unknow label'}
      </Text>
    </TouchableOpacity>
  );
};

const DoveTab = ({navigation, route}) => {
  const {flex1, jcCenter, aiCenter} = common;
  const {
    params: {subtype},
  } = route;

  const {data, refetch, isFetching} = useQuery({
    queryKey: [
      'getUserExploring',
      {filter: 2, limit: 35, offset: 0, subtype: subtype},
    ],
    queryFn: getUserExploring,
  });

  return (
    <View style={[flex1, jcCenter, aiCenter]}>
      <FlatList
        data={data?.exploring}
        renderItem={({item}) => (
          <DovesItem
            item={item}
            navigation={navigation}
            onDeleteItem={refetch}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
        ListHeaderComponent={
          <ListHeaderComponent navigation={navigation} route={route} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});

export default DoveTab;
