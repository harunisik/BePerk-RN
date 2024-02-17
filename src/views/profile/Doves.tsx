import {View, Text, StyleSheet, FlatList} from 'react-native';
import {getUserPerks, updateUser} from '../../services/UserService';
import {useMutation, useQuery} from 'react-query';
import {useStore} from '../../containers/StoreContainer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {dateDiff} from '../../utils/DateUtil';
import common from '../../styles/sharedStyles';
import {showMessage} from 'react-native-flash-message';
import {useState} from 'react';
import Comment from '../doves/Comment';
import Followers from './Followers';

enum DoveType {
  Dove,
  Testimony,
  Prayer,
}

const DoveTypes = {
  [DoveType.Dove]: {label: 'Dove', color: 'dodgerblue'},
  [DoveType.Testimony]: {label: 'Testimony', color: 'chocolate'},
  [DoveType.Prayer]: {label: 'Prayer request', color: 'darkorchid'},
};

export const CommentLike = ({
  id,
  type,
  isLiked,
  likes_count,
  onLike = (count: number) => {},
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likes_count);

  const {font12, cGap3, row, aiCenter} = common;

  const handleLike = useMutation({
    mutationFn: newLike => updateUser(newLike),
    onSuccess: ([{likes, comments}]) => {
      setLiked(liked ? 0 : 1);
      setLikesCount(likes);
      onLike(comments);
    },
    onError: ({message}) => {
      showMessage({message, type: 'danger'});
    },
  });

  return (
    <View style={[cGap3, row, aiCenter]}>
      <MaterialCommunityIcons
        name="heart"
        size={18}
        color={liked ? 'blue' : 'gray'}
        onPress={() => handleLike.mutate({id, type, like: liked ? -1 : 1})}
      />
      <Text style={font12}>{likesCount}</Text>
    </View>
  );
};

const DovesItem = ({item, navigation}) => {
  const [commentsCount, setCommentsCount] = useState(item.comments_count);

  const {
    jcSpaceBetween,
    aiCenter,
    row,
    cGap3,
    cGap10,
    rGap15,
    font11,
    font12,
    white,
    p5,
    p15,
    radius6,
  } = common;

  return (
    <View style={[styles.itemContainer, rGap15, p15]}>
      <View style={[aiCenter, row, jcSpaceBetween]}>
        <View style={[cGap10, row, aiCenter]}>
          <MaterialCommunityIcons name="account" size={26} />
          <Text>{dateDiff(item.upload_time * 1000)}</Text>
        </View>
        <View
          style={[
            radius6,
            p5,
            {backgroundColor: DoveTypes[item.subtype].color},
          ]}>
          <Text style={[white, font11]}>{DoveTypes[item.subtype].label}</Text>
        </View>
      </View>
      <View>
        <Text>{item.caption}</Text>
      </View>
      <View>
        <View style={[aiCenter, row, jcSpaceBetween]}>
          <View style={[cGap10, row, aiCenter]}>
            <CommentLike
              id={item.id}
              type={item.type}
              isLiked={item.liked}
              likes_count={item.likes_count}
              onLike={setCommentsCount}
            />
            <View style={[cGap3, row, aiCenter]}>
              <MaterialCommunityIcons
                name="comment-processing-outline"
                size={18}
                color="gray"
                onPress={() =>
                  navigation.navigate(Comment.name, {comment: item})
                }
              />
              <Text style={font12}>{commentsCount}</Text>
            </View>
            <MaterialCommunityIcons
              name="share-outline"
              size={22}
              color="gray"
              onPress={() =>
                navigation.navigate(Followers.name, {comment: item})
              }
            />
          </View>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={22}
            color="gray"
          />
        </View>
      </View>
    </View>
  );
};

const Doves = ({navigation}) => {
  const {flex1, jcCenter, aiCenter, dashed} = common;

  const {
    store: {
      authResult: {id},
    },
  } = useStore();

  const {data, refetch, isFetching} = useQuery({
    queryKey: ['getUserPerks', {id}],
    queryFn: getUserPerks,
  });

  return (
    <View style={[flex1, jcCenter, aiCenter, dashed]}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <DovesItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
        onRefresh={refetch}
        refreshing={isFetching}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
  },
});

export default Doves;
