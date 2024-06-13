import common from '../../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {useMutation} from '../../../hooks/reactQueryHooks';
import {postUserLike} from '../../../services/UserService';
import Text from '../Text';
import View from '../View';
import {HeartIcon} from '../Icons';

const {cGap1, cGap2, cGap3, row, aiCenter, rGap5} = common;

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
      style={[aiCenter, ...(vertical ? [rGap5] : [row, cGap3])]}
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
