import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {useCustomMutation as useMutation} from '../../../hooks/commonHooks';
import {postUserLike} from '../../../services/UserService';

const {font12, cGap3, row, aiCenter, rGap5} = common;

interface LikeButtonProps {
  item: any;
  type: any;
  size?: number;
  color?: string;
  vertical?: boolean;
}

const LikeButtton = ({
  item,
  type,
  size = 18,
  color = 'dodgerblue',
  vertical = false,
}: LikeButtonProps) => {
  const [liked, setLiked] = useState(item.liked);
  const [likesCount, setLikesCount] = useState(item.likes_count);
  const userLike = useMutation(postUserLike);

  const handlePress = () =>
    userLike.mutate(
      {id: item.id, type, like: liked ? -1 : 1},
      {
        onSuccess: ([{likes}]) => {
          setLiked(liked ? 0 : 1);
          setLikesCount(likes);
        },
      },
    );

  useEffect(() => {
    setLiked(item.liked);
    setLikesCount(item.likes_count);
  }, [item]);

  return (
    <View style={[aiCenter, ...(vertical ? [rGap5] : [row, cGap3])]}>
      <MaterialCommunityIcons
        name={liked ? 'heart' : 'heart-outline'}
        size={size}
        color={color}
        onPress={handlePress}
      />
      <Text style={[font12, {color}]}>{likesCount}</Text>
    </View>
  );
};

export default LikeButtton;
