import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../../styles/sharedStyles';
import Comment from '../../../views/doves/Comment';
import {useNavigation} from '@react-navigation/native';

const {font12, cGap3, row, aiCenter, rGap5} = common;

interface CommentButtonProps {
  id: number;
  type: number;
  fullname: string;
  username: string;
  caption: string;
  uploadTime: number;
  commentsCount: number;
  size?: number;
  color?: string;
  vertical?: boolean;
}

const CommentButton = ({
  id,
  type,
  fullname,
  username,
  caption,
  uploadTime,
  commentsCount,
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
        onPress={() =>
          navigation.navigate(Comment.name, {
            id,
            type,
            fullname,
            username,
            caption,
            uploadTime,
          })
        }
      />
      <Text style={[font12, {color}]}>{commentsCount}</Text>
    </View>
  );
};

export default CommentButton;
