import common from '../../../styles/sharedStyles';
import Comment from '../../../views/doves/Comment';
import {useNavigation} from '@react-navigation/native';
import Text from '../Text';
import View from '../View';
import {CommentIcon, CommentIcon2} from '../Icons';

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
  color?: string;
  backgroundColor?: string;
  vertical?: boolean;
  iconSize?: number;
  labelSize?: number;
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
  color,
  vertical = false,
  iconSize,
  labelSize,
}: CommentButtonProps) => {
  const navigation = useNavigation();

  return (
    <View
      style={[aiCenter, ...(vertical ? [rGap5] : [row, cGap3])]}
      disableTheme>
      <CommentIcon
        color={color}
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
        size={iconSize}
      />
      <Text color={color} size={labelSize}>
        {commentsCount}
      </Text>
    </View>
  );
};

export default CommentButton;
