import {View, FlatList, Text} from 'react-native';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {getMy24} from '../../services/UserService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import common from '../../styles/sharedStyles';

const {bold, row, flex1, p5, font12, aiCenter} = common;

const StoriesItem = ({item}) => {
  return (
    <View style={[flex1, p5, aiCenter]}>
      <MaterialIcons name="account-circle" size={76} color="lightgray" />
      <View style={[row]}>
        <Text style={[bold, font12]} numberOfLines={1}>
          {item.fullname}
        </Text>
        {item.isVerified === 1 && (
          <MaterialIcons name="verified" size={16} color="dodgerblue" />
        )}
      </View>
    </View>
  );
};

const StoriesTab = () => {
  const {data, refetch, isFetching} = useQuery(getMy24);

  return (
    <FlatList
      data={data?.my24}
      renderItem={({item}) => <StoriesItem item={item} />}
      keyExtractor={item => item.id}
      onRefresh={refetch}
      refreshing={isFetching}
      numColumns={4}
    />
  );
};

export default StoriesTab;
