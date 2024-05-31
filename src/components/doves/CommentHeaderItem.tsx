import {StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {dateDiff} from '../../utils/DateUtil';
import AccountCard from '../common/AccountCard';
import {useNavigation} from '@react-navigation/native';
import Text from '../common/Text';
import View from '../common/View';
import HR from '../common/HR';

const {row, rGap15, cGap10, bold, gray, pr10, flex1} = common;

interface CommentHeaderItemProps {
  fullname: string;
  username: string;
  userId: string;
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
  const navigation = useNavigation();

  return (
    <View
      style={[styles.headerContainer, row, cGap10, {alignItems: 'flex-start'}]}>
      <AccountCard size={15} userId={userId} displayUsername={false} goBack />
      <View style={[rGap15, flex1]}>
        <Text style={pr10}>
          <Text style={bold}>{(fullname ?? username) + ' '}</Text>
          <Text>{caption}</Text>
        </Text>
        <Text style={[gray]}>{dateDiff(uploadTime * 1000)}</Text>
      </View>
      <HR />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: 15,
    marginBottom: 15,
  },
});

export default CommentHeaderItem;
