import common from '../../styles/sharedStyles';
import {dateDiff} from '../../utils/DateUtil';
import AccountCard from '../common/AccountCard';
import Text from '../common/Text';
import View from '../common/View';
import HR from '../common/HR';
import {TEXT_SIZE} from './CommentItem';

const {row, rGap10, bold, gray, pr10, flex1} = common;

interface CommentHeaderItemProps {
  fullname: string;
  username: string;
  userId: number;
  caption: string;
  uploadTime: number;
}

const CommentHeaderItem = ({
  fullname,
  username,
  userId,
  caption,
  uploadTime,
}: CommentHeaderItemProps) => {
  return (
    <View style={{paddingBottom: 15, rowGap: 10}}>
      <View style={[row, {alignItems: 'flex-start'}]}>
        <AccountCard size={20} userId={userId} displayUsername={false} goBack />
        <View style={[rGap10, flex1]}>
          <Text size={TEXT_SIZE} style={pr10}>
            <Text size={TEXT_SIZE} style={bold}>
              {(fullname ?? username) + ' '}
            </Text>
            <Text size={TEXT_SIZE}>{caption}</Text>
          </Text>
          <Text size={TEXT_SIZE} style={[gray]}>
            {dateDiff(uploadTime * 1000)}
          </Text>
        </View>
      </View>
      <HR />
    </View>
  );
};

export default CommentHeaderItem;
