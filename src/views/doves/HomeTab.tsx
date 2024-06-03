import {Image, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import DovesItem from '../../components/doves/DovesItem';
import DovesItemOptions from '../../components/doves/DovesItemOptions';
import ItemSeperator from '../../components/common/ItemSpearator';
import {useCallback} from 'react';
import {useQuery} from '../../hooks/reactQueryHooks';
import {getUserPerks} from '../../services/UserService';
import {useGetUserFeed} from '../../hooks/infiniteQueryHooks';
import InfiniteFlatList from '../../components/common/InfiniteFlatList';
import Text from '../../components/common/Text';
import View from '../../components/common/View';
import HR from '../../components/common/HR';

const {jcSpaceBetween, aiCenter, row, rGap10, pv20, p15, bold, white} = common;

const ListHeaderItem = ({item}) => {
  return (
    <View style={[p15]}>
      <View style={[styles.itemContainer, rGap10]}>
        <View style={{backgroundColor: 'dodgerblue'}}>
          <Text style={[bold, white]}>BePerk's Dove of the Day:</Text>
        </View>
        <View style={{backgroundColor: 'dodgerblue'}}>
          <Text style={white}>{item.caption}</Text>
        </View>
        <View
          style={[
            aiCenter,
            row,
            jcSpaceBetween,
            {backgroundColor: 'dodgerblue'},
          ]}>
          <DovesItemOptions
            item={item}
            color="white"
            backgroundColor="dodgerblue"
          />
          <Image
            style={{width: 40, height: 40}}
            source={require('../../assets/beperk_logo.png')}
          />
        </View>
      </View>
      <View style={[pv20]}>
        <Text style={[bold]}>Friend's Activity</Text>
      </View>
      <HR />
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
    <View style={{flex: 1}}>
      <InfiniteFlatList
        data={data}
        renderItem={({item}) => <DovesItem item={item} />}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        refetch={refetch}
        remove={remove}
        ItemSeparatorComponent={ItemSeparatorComponent}
        {...(beperkDove !== undefined && {
          ListHeaderComponent: <ListHeaderItem item={beperkDove[0]} />,
        })}
      />
    </View>
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
