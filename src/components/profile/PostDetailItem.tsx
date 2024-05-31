import {useWindowDimensions} from 'react-native';
import common from '../../styles/sharedStyles';
import LikeButtton from '../common/buttons/LikeButton';
import CommentButton from '../common/buttons/CommentButton';
import {dateDiff} from '../../utils/DateUtil';
import BookmarkButton from '../common/buttons/BookmarkButton';
import DotsButton from '../common/buttons/DotsButton';
import ShareButton from '../common/buttons/ShareButton';
import Video from '../common/Video';
import AccountCard from '../common/AccountCard';
import FastImage from 'react-native-fast-image';
import Text from '../common/Text';
import View from '../common/View';

const {
  jcSpaceBetween,
  jcSpaceAround,
  cGap10,
  row,
  aiCenter,
  ph15,
  pv10,
  bold,
  gray,
  rGap5,
  rGap10,
} = common;

interface PostDetailItemProps {
  id: number;
  userId: number;
  username: string;
  fullname: string;
  type: number;
  bookmark: number;
  liked: number;
  likesCount: number;
  filename: string;
  caption: string;
  uploadTime: number;
  commentsCount: number;
  isViewable?: boolean;
  height: number;
  width: number;
}

const PostDetailItem = ({
  id,
  userId,
  username,
  fullname,
  type,
  bookmark,
  liked,
  likesCount,
  filename,
  caption,
  uploadTime,
  commentsCount,
  isViewable = false,
  height,
  width,
}: PostDetailItemProps) => {
  const {width: windowWidth} = useWindowDimensions();

  return (
    <View style={[rGap10, pv10]}>
      <View style={[row, aiCenter, jcSpaceBetween, ph15]}>
        <AccountCard size={15} userId={userId} username={username} />

        <View style={[row, cGap10]}>
          <BookmarkButton id={id} type={type} isSaved={bookmark} />
          <DotsButton id={id} type={type} userId={userId} username={username} />
        </View>
      </View>

      {type === 1 ? (
        <FastImage
          source={{uri: filename}}
          style={{width: windowWidth, aspectRatio: height ? width / height : 1}}
          resizeMode="contain"
        />
      ) : (
        <View
          style={{
            width: windowWidth,
            aspectRatio: height ? width / height : 1,
          }}>
          <Video uri={filename} paused={!isViewable} />
        </View>
      )}

      <View style={[row, jcSpaceAround]}>
        <LikeButtton
          id={id}
          liked={liked}
          likesCount={likesCount}
          type={type}
        />
        <CommentButton
          id={id}
          type={type}
          userId={userId}
          fullname={fullname}
          username={username}
          caption={caption}
          uploadTime={uploadTime}
          commentsCount={commentsCount}
        />
        <ShareButton id={id} type={type} />
      </View>
      <View style={[ph15, rGap5]}>
        {caption && (
          <Text>
            <Text style={bold}>{username + ' '}</Text>
            <Text>{caption}</Text>
          </Text>
        )}
        <Text style={[gray]}>{dateDiff(uploadTime * 1000)}</Text>
      </View>
    </View>
  );
};

export default PostDetailItem;
