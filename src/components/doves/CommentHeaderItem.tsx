import {View, Text, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {dateDiff} from '../../utils/DateUtil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {row, rGap15, cGap10, bold, font11, gray, pr10, flex1} = common;

interface CommentHeaderItemProps {
  fullname: string;
  username: string;
  caption: string;
  uploadTime: number;
}

const CommentHeaderItem = ({
  fullname,
  username,
  caption,
  uploadTime,
}: CommentHeaderItemProps) => {
  return (
    <View style={[styles.headerContainer, row, cGap10]}>
      <View>
        <MaterialIcons name="account-circle" size={26} color="lightgray" />
      </View>
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
