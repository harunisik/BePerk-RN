import {View, Text, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {dateDiff} from '../../utils/DateUtil';
import AccountCard from '../common/AccountCard';
import {useNavigation} from '@react-navigation/native';

const {row, rGap15, cGap10, bold, font11, gray, pr10, flex1} = common;

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
        <Text style={[font11, gray]}>{dateDiff(uploadTime * 1000)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    paddingBottom: 15,
    marginBottom: 15,
  },
});

export default CommentHeaderItem;
