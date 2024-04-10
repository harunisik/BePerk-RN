import {View, FlatList, Text, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DovesItem from '../../components/doves/DovesItem';
import DovesItemOptions from '../../components/doves/DovesItemOptions';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useCallback} from 'react';
import {useCustomQuery as useQuery} from '../../hooks/commonHooks';
import {getUserFeed, getUserPerks} from '../../services/UserService';
import {useGetUserFeed} from '../../hooks/infiniteQueryHooks';

const ListHeaderItem = ({item}) => {
  const {jcSpaceBetween, aiCenter, row, rGap15, pt20, p15, bold, white} =
    common;

  return (
    <View
      style={[
        p15,
        {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: 'gray',
          marginBottom: 15,
        },
      ]}>
      <View style={[styles.itemContainer, rGap15]}>
        <View>
          <Text style={[white]}>BePerk's Dove of the Day:</Text>
        </View>
        <View>
          <Text style={[white]}>{item.caption}</Text>
        </View>
        <View>
          <View style={[aiCenter, row, jcSpaceBetween]}>
            <DovesItemOptions item={item} />
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

const HomeTab = () => {
  const {data: beperkDove} = useQuery(getUserPerks, {
    id: 2565,
    limit: 1,
    offset: 0,
  });
  const {data, fetchNextPage, isFetching, refetch, remove} = useGetUserFeed(
    2,
    35,
  );

  const ItemSeparatorComponent = useCallback(
    () => <ItemSeperator lineVisible large />,
    [],
  );

  return (
    <FlatList
      data={data}
      renderItem={({item}) => <DovesItem item={item} />}
      keyExtractor={item => item.id}
      onRefresh={() => {
        remove();
        refetch();
      }}
      refreshing={isFetching}
      onEndReached={() => !isFetching && fetchNextPage()}
      ItemSeparatorComponent={ItemSeparatorComponent}
      {...(beperkDove !== undefined && {
        ListHeaderComponent: <ListHeaderItem item={beperkDove[0]} />,
      })}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'dodgerblue',
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
