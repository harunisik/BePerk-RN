import {View} from 'react-native';
import common from '../../styles/sharedStyles';
import LikeButtton from '../common/buttons/LikeButton';
import CommentButton from '../common/buttons/CommentButton';
import ShareButton from '../common/buttons/ShareButton';

const DovesItemOptions = ({item, color = 'dodgerblue'}) => {
  const {aiCenter, row, cGap15} = common;

  return (
    <View style={[cGap15, row, aiCenter]}>
      <LikeButtton
        id={item.id}
        liked={item.liked}
        likesCount={item.likes_count}
        type={item.type}
        color={color}
      />
      <CommentButton
        id={item.id}
        fullname={item.fullname}
        username={item.username}
        caption={item.caption}
        type={item.type}
        commentsCount={item.comments_count}
        uploadTime={item.upload_time}
        color={color}
      />
      <ShareButton id={item.id} type={item.type} color={color} />
    </View>
  );
};

export default DovesItemOptions;
