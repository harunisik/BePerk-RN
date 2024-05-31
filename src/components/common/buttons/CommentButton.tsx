import common from '../../../styles/sharedStyles';
import Comment from '../../../views/doves/Comment';
import {useNavigation} from '@react-navigation/native';
import Text from '../Text';
import View from '../View';
import {CommentIcon} from '../Icons';

const {cGap3, row, aiCenter, rGap5} = common;

interface CommentButtonProps {
  id: number;
  type: number;
  fullname: string;
  username: string;
  userId: number;
  caption: string;
  uploadTime: number;
  commentsCount: number;
  size?: number;
  color?: string;
  backgroundColor?: string;
  vertical?: boolean;
}

const CommentButton = ({
  id,
  type,
  fullname,
  username,
  userId,
  caption,
  uploadTime,
  commentsCount,
  size = 18,
  color,
  backgroundColor,
  vertical = false,
}: CommentButtonProps) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        aiCenter,
        backgroundColor && {backgroundColor},
        ...(vertical ? [rGap5] : [row, cGap3]),
      ]}>
      <CommentIcon
        onPress={() =>
          navigation.navigate(Comment.name, {
            id,
            type,
            fullname,
            username,
            userId,
            caption,
            uploadTime,
          })
        }
      />
      <Text style={{...(color && {color})}}>{commentsCount}</Text>
    </View>
  );
};

export default CommentButton;
