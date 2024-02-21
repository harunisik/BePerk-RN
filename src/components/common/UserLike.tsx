import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {useUpdateUser} from '../../hooks/userHooks';

export const UserLike = ({item, type, onLike = (count: number) => {}}) => {
  const [liked, setLiked] = useState(item.liked);
  const [likesCount, setLikesCount] = useState(item.likes_count);

  const {font12, cGap3, row, aiCenter, gray} = common;

  const handleLike = useUpdateUser((likes, comments) => {
    setLiked(liked ? 0 : 1);
    setLikesCount(likes);
    onLike(comments);
  });

  useEffect(() => {
    setLiked(item.liked);
  }, [item]);

  return (
    <View style={[cGap3, row, aiCenter]}>
      <MaterialCommunityIcons
        name={liked ? 'heart' : 'heart-outline'}
        size={18}
        onPress={() =>
          handleLike.mutate({id: item.id, type, like: liked ? -1 : 1})
        }
      />
      <Text style={[font12, gray]}>{likesCount}</Text>
    </View>
  );
};

export default UserLike;
