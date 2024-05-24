import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import DovesItemOptions from './DovesItemOptions';
import DotsButton from '../common/buttons/DotsButton';
import AccountCard from '../common/AccountCard';

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

const DovesItem = ({item, displayUsername = true}) => {
  const {
    flex1,
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
    pr15,
    pl15,
    radius6,
  } = common;

  return (
    <View style={[rGap15, pr15, pl15]}>
      <View style={[aiCenter, row, jcSpaceBetween]}>
        <View style={[row, cGap10, flex1]}>
          <AccountCard
            size={15}
            userId={item.user_id}
            displayUsername={false}
          />
          <View style={[jcCenter, flex1]}>
            {displayUsername && (
              <View style={[cGap10, row, aiCenter]}>
                <Text style={[bold, flex1]} numberOfLines={1}>
                  {item.fullname ?? item.username}
                </Text>
                {item.isVerified === 1 && (
                  <MaterialIcons name="verified" size={16} color="dodgerblue" />
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
        <DovesItemOptions item={item} />
        <DotsButton
          id={item.id}
          type={item.type}
          userId={item.user_id}
          username={item.username}
        />
      </View>
    </View>
  );
};

export default DovesItem;
