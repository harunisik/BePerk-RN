import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import AccountCard from '../common/AccountCard';
import Text from '../common/Text';
import View from '../common/View';
import {PictureIcon} from '../common/Icons';

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

const ActivityItem = ({item}) => {
  const {flex1, row, cGap10, gray, jcSpaceBetween, aiCenter, shrink1} = common;

  const {user_id, fullname, history_type, type, date_time, isVerified, photo} =
    item;
  const historyType = HistoryTypes[history_type];
  const historyTypeStr = historyType ? historyType.label : '';
  const historyItemTypeStr = HistoryItemType[type] ? HistoryItemType[type] : '';

  return (
    <View style={[row, cGap10, jcSpaceBetween]}>
      <View style={[flex1, row, aiCenter, {columnGap: 5}]}>
        <AccountCard
          size={15}
          userId={user_id}
          username={fullname}
          isVerified={isVerified === 1}
          photo={photo}
        />
        <Text style={shrink1}>
          <Text color="gray">{`${historyTypeStr} ${historyItemTypeStr}. `}</Text>
          <Text color="gray">{dateDiff(date_time * 1000)}</Text>
        </Text>
      </View>
      {item.media?.type === 1 && <PictureIcon />}
    </View>
  );
};

export default ActivityItem;
