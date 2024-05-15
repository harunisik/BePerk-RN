import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {useMutation} from '../../../hooks/customHooks';
import {postUserLike} from '../../../services/UserService';

const {font12, cGap3, row, aiCenter, rGap5} = common;

interface LikeButtonProps {
  id: number;
  liked: number;
  likesCount: number;
  type: number;
  size?: number;
  color?: string;
  vertical?: boolean;
}

const LikeButtton = ({
  id,
  liked,
  likesCount,
  type,
  size = 18,
  color = 'dodgerblue',
  vertical = false,
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
    <View style={[aiCenter, ...(vertical ? [rGap5] : [row, cGap3])]}>
      <MaterialCommunityIcons
        name={likedState ? 'heart' : 'heart-outline'}
        size={size}
        color={color}
        onPress={handlePress}
      />
      <Text style={[font12, {color}]}>{likesCountState}</Text>
    </View>
  );
};

export default LikeButtton;
