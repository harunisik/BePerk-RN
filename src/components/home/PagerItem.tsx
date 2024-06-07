import Video from '../common/Video';
import LikeButtton from '../common/buttons/LikeButton';
import CommentButton from '../common/buttons/CommentButton';
import BookmarkButton from '../common/buttons/BookmarkButton';
import ShareButton from '../common/buttons/ShareButton';
import DotsButton from '../common/buttons/DotsButton';
import AccountCard from '../common/AccountCard';
import Text from '../common/Text';
import {View} from 'react-native';

const PagerItem = ({item, paused = true}) => {
  const {
    filename,
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
  } = item;

  return (
    <View>
      <Video uri={filename} paused={paused} />
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
        <View style={{rowGap: 20}}>
          <LikeButtton
            id={id}
            liked={liked}
            likesCount={likes_count}
            type={type}
            vertical
            iconSize={40}
            color="white"
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
            iconSize={40}
            color="white"
          />
          <BookmarkButton
            id={id}
            type={type}
            isSaved={bookmark}
            iconSize={40}
            color="white"
          />
          <ShareButton id={id} type={type} iconSize={40} color="white" />
          <DotsButton
            id={id}
            type={type}
            userId={user_id}
            username={username}
            iconSize={40}
            color="white"
          />
        </View>
      </View>
    </View>
  );
};

export default PagerItem;
