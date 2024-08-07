import Video from '../common/Video';
import LikeButtton from '../common/buttons/LikeButton';
import CommentButton from '../common/buttons/CommentButton';
import BookmarkButton from '../common/buttons/BookmarkButton';
import ShareButton from '../common/buttons/ShareButton';
import PostItemSettings from '../common/buttons/PostItemSettings';
import AccountCard from '../common/AccountCard';
import Text from '../common/Text';
import {View} from 'react-native';

const PagerItem = ({item, paused}) => {
  const {
    filename,
    cover,
    user_id,
    fullname,
    username,
    caption,
    id,
    liked,
    likes_count,
    type,
    comments_count,
    upload_time,
    bookmark,
    photo,
    isVerified,
    subscribed,
  } = item;

  return (
    <View>
      <Video
        poster={cover}
        posterResizeMode="cover"
        uri={paused ? cover : filename}
        // paused={paused}
      />

      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: 15,
        }}>
        <View
          style={{
            alignSelf: 'flex-end',
            width: '70%',
            rowGap: 10,
            alignItems: 'flex-start',
          }}>
          <AccountCard
            userId={user_id}
            username={fullname}
            size={26}
            vertical
            center={false}
            labelStyle={{color: 'white'}}
            photo={photo}
            isVerified={isVerified === 1}
          />
          <Text style={{color: 'white'}}>{caption}</Text>
        </View>
        <View style={{rowGap: 25, alignItems: 'center'}}>
          <LikeButtton
            id={id}
            liked={liked}
            likesCount={likes_count}
            type={type}
            vertical
            color="white"
            iconSize={30}
          />
          <CommentButton
            id={id}
            fullname={fullname}
            username={username}
            userId={user_id}
            caption={caption}
            type={type}
            commentsCount={comments_count}
            uploadTime={upload_time}
            vertical
            color="white"
            iconSize={30}
          />
          <BookmarkButton
            id={id}
            type={type}
            isSaved={bookmark}
            color="white"
            iconSize={30}
          />
          <ShareButton id={id} type={type} iconSize={30} color="white" />
          <PostItemSettings
            id={id}
            type={type}
            userId={user_id}
            username={username}
            subscribed={subscribed}
            color="white"
            iconSize={30}
          />
        </View>
      </View>
    </View>
  );
};

export default PagerItem;
