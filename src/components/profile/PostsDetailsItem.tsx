import {Text, View} from 'react-native';
import common from '../../styles/sharedStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LikeButtton from '../common/buttons/LikeButton';
import CommentButton from '../common/buttons/CommentButton';
import {dateDiff} from '../../utils/DateUtil';
import FastImage from '../common/FastImage';
import BookmarkButton from '../common/buttons/BookmarkButton';
import DotsButton from '../common/buttons/DotsButton';
import ShareButton from '../common/buttons/ShareButton';

const PostsDetailsItem = ({item}) => {
  const {
    jcSpaceBetween,
    jcSpaceAround,
    cGap10,
    row,
    aiCenter,
    ph15,
    pv10,
    bold,
    font11,
    gray,
    rGap5,
    rGap10,
  } = common;

  return (
    <View style={[rGap10, pv10]}>
      <View style={[row, aiCenter, jcSpaceBetween, ph15]}>
        <View style={[row, aiCenter, cGap10]}>
          <MaterialIcons name="account-circle" size={30} color="lightgray" />
          <Text style={bold}>{item.username}</Text>
        </View>

        <View style={[row, cGap10]}>
          <BookmarkButton item={item} />
          <DotsButton item={item} />
        </View>
      </View>

      <FastImage uri={item.filename} />

      <View style={[row, jcSpaceAround]}>
        <LikeButtton item={item} type={item.type} />
        <CommentButton item={item} />
        <ShareButton item={item} />
      </View>
      <View style={[ph15, rGap5]}>
        {item.caption && (
          <Text>
            <Text style={bold}>{item.username + ' '}</Text>
            <Text>{item.caption}</Text>
          </Text>
        )}
        <Text style={[font11, gray]}>{dateDiff(item.upload_time * 1000)}</Text>
      </View>
    </View>
  );
};

export default PostsDetailsItem;
