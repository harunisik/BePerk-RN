import {StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {dateDiff} from '../../utils/DateUtil';
import AccountCard from '../common/AccountCard';
import Text from '../common/Text';
import View from '../common/View';
import HR from '../common/HR';

const {row, rGap15, cGap10, bold, gray, pr10, flex1} = common;

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
        <AccountCard size={15} userId={userId} displayUsername={false} goBack />
        <View style={[rGap15, flex1]}>
          <Text style={pr10}>
            <Text style={bold}>{(fullname ?? username) + ' '}</Text>
            <Text>{caption}</Text>
          </Text>
          <Text style={[gray]}>{dateDiff(uploadTime * 1000)}</Text>
        </View>
      </View>
      <HR />
    </View>
  );
};

export default CommentHeaderItem;
