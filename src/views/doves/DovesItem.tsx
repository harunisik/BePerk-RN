import {View, Text, StyleSheet} from 'react-native';
import {useStore} from '../../containers/StoreContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import {ModalActionType} from '../../containers/ModalAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DovesItemOptions from './DovesItemOptions';

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

export const DovesItem = ({
  item,
  navigation,
  onPressMore,
  displayUsername = true,
}) => {
  const {dispatch} = useStore();

  const {
    jcSpaceBetween,
    aiCenter,
    jcCenter,
    row,
    cGap10,
    rGap15,
    font11,
    font12,
    white,
    gray,
    bold,
    p5,
    p15,
    radius6,
  } = common;

  return (
    <View style={[styles.itemContainer, rGap15, p15]}>
      <View style={[aiCenter, row, jcSpaceBetween]}>
        <View style={[row, cGap10]}>
          <View style={[jcCenter]}>
            <MaterialCommunityIcons name="account" size={26} />
          </View>
          <View style={[jcCenter]}>
            {displayUsername && (
              <View style={[cGap10, row, aiCenter]}>
                <Text style={bold}>{item.username}</Text>
                {item.isVerified === 1 && (
                  <MaterialIcons name="verified" size={16} color="blue" />
                )}
              </View>
            )}
            <Text style={[gray, font12]}>
              {dateDiff(item.upload_time * 1000)}
            </Text>
          </View>
        </View>
        <View
          style={[
            radius6,
            p5,
            {backgroundColor: DoveTypes[item.subtype].color},
          ]}>
          <Text style={[white, font11]}>{DoveTypes[item.subtype].label}</Text>
        </View>
      </View>
      <Text>{item.caption}</Text>
      <View style={[aiCenter, row, jcSpaceBetween]}>
        <DovesItemOptions navigation={navigation} item={item} />
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={22}
          color="gray"
          onPress={() => {
            onPressMore(item);
            dispatch({type: ModalActionType.SET_MODAL, isModalOpen: true});
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
  },
});

export default DovesItem;
