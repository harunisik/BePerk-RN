import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import Comment from '../../views/doves/Comment';

const UserComment = ({navigation, item}) => {
  const {font12, cGap3, row, aiCenter} = common;

  return (
    <View style={[cGap3, row, aiCenter]}>
      <MaterialCommunityIcons
        name="comment-processing-outline"
        size={18}
        color="gray"
        onPress={() => navigation.navigate(Comment.name, {comment: item})}
      />
      <Text style={font12}>{item.comments_count}</Text>
    </View>
  );
};

export default UserComment;
