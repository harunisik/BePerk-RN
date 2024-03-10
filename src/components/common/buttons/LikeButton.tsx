import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {useCustomMutation as useMutation} from '../../../hooks/commonHooks';
import {postUserLike} from '../../../services/UserService';

const LikeButtton = ({item, type}) => {
  const [liked, setLiked] = useState(item.liked);
  const [likesCount, setLikesCount] = useState(item.likes_count);

  const {font12, cGap3, row, aiCenter, gray} = common;

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
    <View style={[cGap3, row, aiCenter]}>
      <MaterialCommunityIcons
        name={liked ? 'heart' : 'heart-outline'}
        size={18}
        onPress={handlePress}
        color="dodgerblue"
      />
      <Text style={[font12, gray]}>{likesCount}</Text>
    </View>
  );
};

export default LikeButtton;
