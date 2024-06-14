import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import DovesItemOptions from './DovesItemOptions';
import PostItemSettings from '../common/buttons/PostItemSettings';
import AccountCard from '../common/AccountCard';
import Text from '../common/Text';
import View from '../common/View';
import {useColors} from '../../hooks/customHooks';

const {jcSpaceBetween, aiCenter, row, rGap15, pr15, pl15, radius6} = common;

enum DoveType {
  Dove,
  Testimony,
  Prayer,
}

const DoveTypes = {
  [DoveType.Dove]: {label: 'Dove', color: '#0AAEEF'},
  [DoveType.Testimony]: {label: 'Testimony', color: 'chocolate'},
  [DoveType.Prayer]: {label: 'Prayer request', color: 'darkorchid'},
};

const DovesItem = ({item, theme}) => {
  const {
    id,
    type,
    fullname,
    username,
    user_id,
    upload_time,
    isVerified,
    subtype,
    caption,
    photo,
    subscribed,
  } = item;
  const {backgroundColor} = useColors();
  const _backgroundColor = theme ? theme.backgroundColor : backgroundColor;

  return (
    <View style={[rGap15, pr15, pl15]} backgroundColor={_backgroundColor}>
      <View
        style={[aiCenter, row, jcSpaceBetween]}
        backgroundColor={_backgroundColor}>
        <AccountCard
          username={fullname ?? username}
          size={15}
          userId={user_id}
          subtitle={dateDiff(upload_time * 1000)}
          isVerified={isVerified === 1}
          photo={photo}
        />
        <View
          style={[
            radius6,
            {
              backgroundColor: DoveTypes[subtype].color,
              paddingHorizontal: 10,
              paddingVertical: 3,
            },
          ]}>
          <Text color="white" size={15}>
            {DoveTypes[subtype].label}
          </Text>
        </View>
      </View>
      <Text>{caption}</Text>
      <View
        style={[aiCenter, row, jcSpaceBetween]}
        backgroundColor={_backgroundColor}>
        <DovesItemOptions
          item={item}
          iconSize={16}
          labelSize={14}
          backgroundColor={_backgroundColor}
          color="gray"
        />
        <PostItemSettings
          id={id}
          type={type}
          userId={user_id}
          username={username}
          subscribed={subscribed}
          iconSize={20}
          color="gray"
        />
      </View>
    </View>
  );
};

export default DovesItem;
