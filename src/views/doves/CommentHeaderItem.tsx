import {View, Text, StyleSheet} from 'react-native';
import common from '../../styles/sharedStyles';
import {dateDiff} from '../../utils/DateUtil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CommentHeaderItem = ({item}) => {
  const {row, rGap15, cGap10, bold, font11, gray, pr10, flex1} = common;

  return (
    <View style={[styles.headerContainer, row, cGap10]}>
      <View>
        <MaterialCommunityIcons name="account" size={26} />
      </View>
      <View style={[rGap15, flex1]}>
        <Text style={pr10}>
          <Text style={bold}>{item.fullname + ' '}</Text>
          <Text>{item.caption}</Text>
        </Text>
        <Text style={[font11, gray]}>{dateDiff(item.upload_time * 1000)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
});

export default CommentHeaderItem;
