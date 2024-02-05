import {View, Text, StyleSheet, FlatList} from 'react-native';
import {getUserPerks} from '../../services/UserService';
import {useQuery} from 'react-query';
import {useStore} from '../../containers/StoreContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';

enum DoveType {
  Dove,
  Testimony,
  Prayer,
}

const DoveTypes = {
  [DoveType.Dove]: {label: 'Dove', color: 'dodgerblue'},
  [DoveType.Testimony]: {label: 'Testimony', color: 'chocolate'},
  [DoveType.Prayer]: {label: 'Prayer request', color: 'darkorchid'},
};

const DovesItem = ({item}) => {
  const {
    jcSpaceBetween,
    aiCenter,
    row,
    cGap3,
    cGap10,
    rGap15,
    font11,
    font12,
    white,
  } = common;

  return (
    <View style={[styles.container2, rGap15]}>
      <View style={[aiCenter, row, jcSpaceBetween]}>
        <View style={[cGap10, row, aiCenter]}>
          <MaterialCommunityIcons name="account" size={26} />
          <Text>{dateDiff(item.upload_time * 1000)}</Text>
        </View>
        <View
          style={[
            styles.container6,
            {backgroundColor: DoveTypes[item.subtype].color},
          ]}>
          <Text style={[white, font11]}>{DoveTypes[item.subtype].label}</Text>
        </View>
      </View>
      <View>
        <Text>{item.caption}</Text>
      </View>
      <View>
        <View style={[aiCenter, row, jcSpaceBetween]}>
          <View style={[cGap10, row, aiCenter]}>
            <View style={[cGap3, row, aiCenter]}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={18}
                color="gray"
              />
              <Text style={font12}>{item.likes_count}</Text>
            </View>
            <View style={[cGap3, row, aiCenter]}>
              <MaterialCommunityIcons
                name="comment-processing-outline"
                size={18}
                color="gray"
              />
              <Text style={font12}>{item.comments_count}</Text>
            </View>
            <MaterialCommunityIcons
              name="share-outline"
              size={22}
              color="gray"
            />
          </View>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={22}
            color="gray"
          />
        </View>
      </View>
    </View>
  );
};

const Doves = () => {
  const {flex1, jcCenter, aiCenter, dashed} = common;

  //  "GET /user/getPerks?id=170763&limit=35&offset=0 HTTP/1.1" 200 587
  const {
    store: {
      authResult: {id},
    },
  } = useStore();
  const {data} = useQuery({
    queryKey: ['getUserPerks', {id}],
    queryFn: getUserPerks,
  });

  return (
    <View style={[flex1, jcCenter, aiCenter, dashed]}>
      <FlatList
        data={data}
        renderItem={({item}) => <DovesItem item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    padding: 15,
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
  },
  container6: {
    borderRadius: 6,
    padding: 5,
  },
});

export default Doves;
