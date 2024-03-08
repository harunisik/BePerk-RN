import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import common from '../../../styles/sharedStyles';
import {useEffect, useState} from 'react';
import {usePostUserLike} from '../../../hooks/userHooks';
import {useRoute} from '@react-navigation/native';

const LikeButtton = ({item, type}) => {
  const [liked, setLiked] = useState(item.liked);
  const [likesCount, setLikesCount] = useState(item.likes_count);
  const route = useRoute();

  const {font12, cGap3, row, aiCenter, gray} = common;

  const postUserLike = usePostUserLike(route.name);

  const handlePress = () =>
    postUserLike.mutate(
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
