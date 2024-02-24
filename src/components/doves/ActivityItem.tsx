import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';

enum HistoryItemType {
  Video,
  Photo,
  Post,
  Dove,
}

enum HistoryType {
  Following,
  Liked,
  Mentioned,
  Tagged,
  Replied,
  Commented,
  SharedWith,
  Shared,
}

const HistoryTypes = {
  [HistoryType.Following]: {label: 'started following you'},
  [HistoryType.Liked]: {label: 'liked your'},
  [HistoryType.Mentioned]: {label: 'mentioned you in a comment'},
  [HistoryType.Tagged]: {label: 'tagged you in this'},
  [HistoryType.Replied]: {label: 'replied to your comment in this'},
  [HistoryType.Commented]: {label: 'commented on your'},
  [HistoryType.SharedWith]: {label: 'shared with you by user'},
  [HistoryType.Shared]: {label: 'shared a'},
};

const ActivityItem = ({navigation, item}) => {
  const {
    flex1,
    row,
    cGap10,
    font11,
    gray,
    bold,
    jcSpaceBetween,
    aiCenter,
    pt10,
    pb10,
    shrink1,
  } = common;

  const {fullname, history_type, type, date_time} = item;
  const historyType = HistoryTypes[history_type];
  const historyTypeStr = historyType ? historyType.label : '';
  const historyItemTypeStr = HistoryItemType[type] ? HistoryItemType[type] : '';

  return (
    <View style={[row, cGap10, jcSpaceBetween, pb10, pt10]}>
      <View style={[flex1, row, cGap10, aiCenter]}>
        <MaterialCommunityIcons name="account" size={26} />
        <Text style={shrink1}>
          <Text style={bold}>{fullname + ' '}</Text>
          <Text>{`${historyTypeStr} ${historyItemTypeStr}. `}</Text>
          <Text style={[font11, gray]}>{dateDiff(date_time * 1000)}</Text>
        </Text>
      </View>
      {item.media?.type === 1 && (
        <MaterialCommunityIcons name="account" size={26} />
      )}
    </View>
  );
};

export default ActivityItem;
