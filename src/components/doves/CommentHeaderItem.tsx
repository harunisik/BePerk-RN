import {View, Text, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {dateDiff} from '../../utils/DateUtil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CommentHeaderItem = ({item}) => {
  const {row, rGap15, cGap10, bold, font11, gray, pr10, flex1} = common;

  return (
    <View style={[styles.headerContainer, row, cGap10]}>
      <View>
        <MaterialIcons name="account-circle" size={26} color="lightgray" />
      </View>
      <View style={[rGap15, flex1]}>
        <Text style={pr10}>
          <Text style={bold}>{(item.fullname ?? item.username) + ' '}</Text>
          <Text>{item.caption}</Text>
        </Text>
        <Text style={[font11, gray]}>{dateDiff(item.upload_time * 1000)}</Text>
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
