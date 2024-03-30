import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../../styles/sharedStyles';
import Comment from '../../../views/doves/Comment';
import {useNavigation} from '@react-navigation/native';

const {font12, cGap3, row, aiCenter, rGap5} = common;

interface CommentButtonProps {
  item: any;
  size?: number;
  color?: string;
  vertical?: boolean;
}

const CommentButton = ({
  item,
  size = 18,
  color = 'dodgerblue',
  vertical = false,
}: CommentButtonProps) => {
  const navigation = useNavigation();

  return (
    <View style={[aiCenter, ...(vertical ? [rGap5] : [row, cGap3])]}>
      <MaterialCommunityIcons
        name="comment-processing-outline"
        size={size}
        color={color}
        onPress={() => navigation.navigate(Comment.name, {item})}
      />
      <Text style={[font12, {color}]}>{item.comments_count}</Text>
    </View>
  );
};

export default CommentButton;
