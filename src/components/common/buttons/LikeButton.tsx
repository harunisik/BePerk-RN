import common from '../../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {postUserLike} from '../../../services/UserService';
import Text from '../Text';
import View from '../View';
import {HeartIcon} from '../Icons';
import {ViewStyle} from 'react-native';

const {cGap3, row, aiCenter, rGap3} = common;

interface LikeButtonProps {
  id: number;
  liked: number;
  likesCount: number;
  type: number;
  color?: string;
  backgroundColor?: string;
  vertical?: boolean;
  iconSize?: number;
  labelSize?: number;
  style?: ViewStyle;
}

const LikeButtton = ({
  id,
  liked,
  likesCount,
  type,
  color,
  vertical = false,
  iconSize,
  labelSize,
  style,
}: LikeButtonProps) => {
  const [likedState, setLikedState] = useState(liked);
  const [likesCountState, setLikesCountState] = useState(likesCount);
  const userLike = useMutation(postUserLike);

  const handlePress = () =>
    userLike.mutate(
      {id: id, type, like: likedState ? -1 : 1},
      {
        onSuccess: ([{likes}]) => {
          setLikedState(likedState ? 0 : 1);
          setLikesCountState(likes);
        },
      },
    );

  useEffect(() => {
    setLikedState(liked);
    setLikesCountState(likesCount);
  }, [liked, likesCount]);

  return (
    <View
      style={[aiCenter, ...(vertical ? [rGap3] : [row, cGap3]), style]}
      disableTheme>
      <HeartIcon
        onPress={handlePress}
        isOutlined={likedState === 0}
        color={color}
        size={iconSize}
      />
      <Text color={color} size={labelSize}>
        {likesCountState}
      </Text>
    </View>
  );
};

export default LikeButtton;
