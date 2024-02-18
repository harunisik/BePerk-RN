import {View, FlatList, Text, StyleSheet} from 'react-native';
import {useState} from 'react';
import common from '../../styles/sharedStyles';
import {useQuery} from 'react-query';
import {getUserFeed, getUserPerks} from '../../services/UserService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DovesItem from './DovesItem';
import DovesItemModal from './DovesItemModal';
import DovesItemOptions from './DovesItemOptions';

const ListHeaderItem = ({item, navigation}) => {
  const {jcSpaceBetween, aiCenter, row, rGap15, pt20, p15, bold, white} =
    common;

  return (
    <View style={[p15]}>
      <View style={[styles.itemContainer, rGap15]}>
        <View>
          <Text style={[white]}>BePerk's Dove of the Day:</Text>
        </View>
        <View>
          <Text style={[white]}>{item.caption}</Text>
        </View>
        <View>
          <View style={[aiCenter, row, jcSpaceBetween]}>
            <DovesItemOptions navigation={navigation} item={item} />
            <MaterialCommunityIcons name="heart" size={22} color="white" />
          </View>
        </View>
      </View>
      <View style={[pt20]}>
        <Text style={[bold]}>Friend's Activity</Text>
      </View>
    </View>
  );
};

const HomeTab = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState();
  const {flex1, jcCenter, aiCenter} = common;

  const {data: beperkDove} = useQuery({
    queryKey: ['getUserPerks', {id: 2565, limit: 1, offset: 0}],
    queryFn: getUserPerks,
  });

  const {data, refetch, isFetching} = useQuery({
    queryKey: ['getUserFeed', {filter: 2, limit: 35, offset: 0}],
    queryFn: getUserFeed,
  });

  return (
    <View style={[flex1, jcCenter, aiCenter]}>
      <FlatList
        data={data?.feed}
        renderItem={({item}) => (
          <DovesItem
            item={item}
            navigation={navigation}
            onPressMore={setSelectedItem}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
        ListHeaderComponent={
          beperkDove && (
            <ListHeaderItem item={beperkDove[0]} navigation={navigation} />
          )
        }
      />
      <DovesItemModal item={selectedItem} onDeleteItem={refetch} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 15,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
  },
});

export default HomeTab;